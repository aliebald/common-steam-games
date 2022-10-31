import React, { useContext, useEffect, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { Socket } from "socket.io-client";
import { useNavigate } from "react-router";
import { useMediaQuery } from "react-responsive";
import Collapsible from "../../components/collapsible/Collapsible";
import GamesList from "../../components/gamesList/GamesList";
import Invite from "../../components/invite/Invite";
import Loading from "../../components/loading/Loading";
import UserHeader from "../../components/userHeader/UserHeader";
import GroupHeader from "../../components/groupHeader/GroupHeader";
import FriendsList from "../../components/friendsList/FriendsList";
import Settings from "../../components/settings/Settings";
import Container from "../../components/container/Container";
import Confirmation from "../../components/confirmation/Confirmation";
import Modal from "../../components/modal/Modal";
import CustomGameInput from "../../components/customGameInput/CustomGameInput";
import Button from "../../components/button/Button";
import AddButton from "../../components/addButton/AddButton";
import { calculatePreferences, getCommonAppIds, initiateSocket, reorderGames } from "./util";
import LoggerContext from "../../Logger";
import "./matching.css";

function Matching(props: {
  steamId: string;
  sessionId?: string;
  settings: Settings;
  setSettings: (settings: Settings) => void;
  addError: (error: ErrorType) => void;
}) {
  const [users, setUsers] = useState<User[]>([]);
  const [self, setSelf] = useState<User>({ steamId: props.steamId });
  const [initiatorId, setInitiatorId] = useState<string>(props.sessionId ? "" : props.steamId);
  const [matchedGames, setMatchedGames] = useState<MatchedGame[]>([]);
  const [customGames, setCustomGames] = useState<Game[]>([]);
  const [sessionId, setSessionId] = useState<string>("");
  const [preferencesChanged, setPreferencesChanged] = useState(false);
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const [showFriendslist, setShowFriendslist] = useState<boolean>(false);
  const [showLeaveModal, setShowLeaveModal] = useState<boolean>(false);
  const [showCustomGameInput, setShowCustomGameInput] = useState<boolean>(false);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [commonAppIds, setCommonAppIds] = useState<number[]>([]);
  const [gameSearch, setGameSearch] = useState("");
  const logger = useContext(LoggerContext);
  const navigate = useNavigate();
  const showFullName = useMediaQuery({ query: "(min-width: 370px)" });

  /** updates settings (state) and sends updateSettings event to backend */
  const updateSettings = (settings: Settings) => {
    if (socket) {
      logger.log("Sending settings");
      socket.emit("updateSettings", settings);
    }
    props.setSettings(settings);
  };

  useEffect(() => {
    setCommonAppIds(getCommonAppIds(users.concat(self)));
  }, [users, self]);

  useEffect(() => {
    const handleSession = (msg: any) => {
      if (!msg) {
        logger.error("handleSession received undefined msg:", msg);
        return;
      }

      if (users.length > 0) {
        logger.warn("Received session but already is part of a session");
        return;
      }

      // Logging
      const session = msg as Session;
      logger.group("Received session");
      for (const [key, value] of Object.entries(session)) {
        logger.log(`${key}:`, value);
      }
      logger.groupEnd();

      // Separate self and other users
      const ownSteamId = session.you ?? self.steamId;
      const newUsers = session.users.filter((user) => user.steamId !== ownSteamId);
      const newSelf = session.users.find((user) => user.steamId === ownSteamId);
      if (!newSelf) {
        props.addError({ status: 400, msg: "Failed to connect to session. Did not find self." });
        if (socket) socket.disconnect();
        navigate("/create");
        return;
      }

      sessionStorage.setItem("sessionId", session.sessionId);
      setSessionId(session.sessionId);
      setSelf(newSelf);
      setUsers(newUsers);
      setInitiatorId(session.initiatorId);
      if (session.customGames && session.customGames.length > 0) {
        setCustomGames(session.customGames);
      }
      if (session.settings) {
        props.setSettings(session.settings);
      }
    };

    const handleUserJoined = (msg: any) => {
      const newUsers = [...users];
      newUsers.push(msg as User);

      logger.group("New user joined the session:");
      logger.log("New user:", msg);
      logger.log("All users:", newUsers);
      logger.groupEnd();

      setUsers(newUsers);
    };

    const handleAddCustomGame = (msg: any) => {
      logger.log("Received customGame:", msg);

      const game = msg as Game;
      setCustomGames([...customGames, game]);

      // Add custom game to own games
      const newSelf = { ...self };
      if (newSelf.preferences) {
        newSelf.preferences.unshift(game);
      } else {
        newSelf.preferences = [game];
      }
      setSelf(newSelf);

      // Add custom game to peers games
      const newUsers = [...users];
      for (const user of newUsers) {
        if (user.preferences) {
          user.preferences.unshift(game);
        } else {
          user.preferences = [game];
        }
      }
      setUsers(newUsers);
    };

    const handleUserDisconnect = (msg: any) => {
      const newUsers = users.filter((user) => user.steamId !== (msg as string));

      logger.group("User disconnected:");
      logger.log("User steamId:", msg);
      logger.log("Remaining users:", newUsers);
      logger.groupEnd();

      setUsers(newUsers);
    };

    const handleUpdateSettings = (msg: any) => {
      logger.log("Received settings:", msg);
      props.setSettings(msg as Settings);
    };

    const handleUpdatePreferences = (msg: any) => {
      logger.group("Received updated preferences");

      const data = msg as PreferencesUpdate;
      const newUsers = [...users];
      const changedUserIndex = newUsers.findIndex((user) => user.steamId === data.steamId);
      if (changedUserIndex !== -1) {
        logger.log(`Updating preferences for ${newUsers[changedUserIndex].personaname} (${data.steamId})`);
        newUsers[changedUserIndex].preferences = data.preferences;
        setUsers(newUsers);
      } else {
        logger.log(`Tried to update preferences for ${data.steamId} but did not find user`);
        logger.log("Original message:", msg);
      }

      logger.groupEnd();
    };

    const handleError = (error: any) => {
      const err = error as ErrorType;
      err.timeout = 15000;
      props.addError(err);
      if (err.status === 550) {
        setShowFriendslist(false);
        return;
      }
      if (socket) socket.disconnect();
      navigate("/create");
    };

    if (socket) {
      socket.removeAllListeners("error");
      socket.removeAllListeners("session");
      socket.removeAllListeners("userJoined");
      socket.removeAllListeners("addCustomGame");
      socket.removeAllListeners("userDisconnect");
      socket.removeAllListeners("updateSettings");
      socket.removeAllListeners("updatePreferences");

      socket.on("error", handleError);
      socket.on("session", handleSession);
      socket.on("userJoined", handleUserJoined);
      socket.on("addCustomGame", handleAddCustomGame);
      socket.on("userDisconnect", handleUserDisconnect);
      socket.on("updateSettings", handleUpdateSettings);
      socket.on("updatePreferences", handleUpdatePreferences);
    }
  }, [self, users, socket, props, navigate, logger, customGames]);

  useEffect(() => {
    const socket = initiateSocket(props.steamId, props.settings, props.sessionId);
    setSocket(socket);

    socket.io.on("reconnect_failed", () => {
      logger.log("Failed to reconnect");
      props.addError({ status: 500, msg: "Lost connection to server", timeout: 15000 });
      navigate("/create");
    });
    socket.io.on("reconnect_attempt", (attempt) => {
      const msg = `Lost connection to server, attempting to reconnect. Attempt (${attempt}/${socket.io.reconnectionAttempts()})`;
      logger.log(msg);
      props.addError({ status: 500, msg: msg, timeout: 6000 });
    });

    return () => {
      logger.log("#### disconnecting ###");
      if (socket) socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.sessionId, props.steamId]);

  // Update group preferences
  useEffect(() => {
    logger.log("calculatePreferences");
    const appIds = props.settings.onlyCommonGames ? commonAppIds : [];
    setMatchedGames(calculatePreferences(users.concat(self), appIds));
  }, [users, self, props.settings.onlyCommonGames, commonAppIds, logger]);

  // Send preferences to backend when changed
  useEffect(() => {
    if (!preferencesChanged || !self.preferences) return;
    if (!socket) {
      logger.error("Cant send preferences, Socket is not defined");
      return;
    }
    logger.log("Sending preferences");
    socket.emit("updatePreferences", self.preferences);
    setPreferencesChanged(false);
  }, [self.preferences, preferencesChanged, logger, socket]);

  /**
   * Handles changes in the drag and drop games list
   */
  const onDragEnd = (result: DropResult): void => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const newSelf: User = { ...self } as User;
    newSelf.preferences = reorderGames((self as User).preferences ?? [], result.source.index, result.destination.index);
    if (gameSearch.length > 0) {
      // Reset game search to avoid unwanted scrolling after changing preferences.
      // Does not update value in UserHeader so the user can build upon the old search query.
      setGameSearch("");
    }
    setSelf(newSelf);
    setPreferencesChanged(true);
  };

  /**
   * Reorders own games either by total playtime or recent (last two weeks) playtime.
   */
  const sortPreferences = (sortBy: "total" | "recent") => {
    // select the correct sort function dependant on the sortBy argument
    let sortFunc: (a: Game, b: Game) => number;
    if (sortBy === "total") {
      sortFunc = (a: Game, b: Game) => {
        if (a.isCustom === b.isCustom) {
          return b.playtime_forever - a.playtime_forever;
        }
        return a.isCustom ? -1 : 1;
      };
    } else {
      sortFunc = (a: Game, b: Game) => {
        if (a.isCustom === b.isCustom) {
          const aPlaytime = a.playtime_2weeks ?? 0;
          const bPlaytime = b.playtime_2weeks ?? 0;
          if (aPlaytime === bPlaytime) {
            // Fallback if playtime in the last two weeks is equal
            return b.playtime_forever - a.playtime_forever;
          }
          return bPlaytime - aPlaytime;
        } else {
          return a.isCustom ? -1 : 1;
        }
      };
    }
    // Sort preferences using sortFunc
    const newSelf: User = { ...self };
    if (newSelf.preferences) {
      newSelf.preferences = newSelf.preferences.sort(sortFunc);
      setSelf(newSelf);
      setPreferencesChanged(true);
    }
  };

  /**
   * Validates a custom game
   * @returns empty string if custom game is valid, otherwise string with an error message
   */
  const validateCustomGame = (game: Game) => {
    if (game.name.length === 0) {
      return "Please enter a name for the custom game.";
    }
    const existingGameNames = customGames.map((existingGame) => existingGame.name);
    if (existingGameNames.includes(game.name)) {
      return "Custom game names must be unique.";
    }
    return "";
  };

  /**
   * Sends a custom game to backend.
   * The game will be added to the other games after being validated in the backend and receiving an unique id.
   */
  const addCustomGame = (game: Game) => {
    if (socket) {
      logger.log("Adding Custom Game", game);
      socket.emit("addCustomGame", game);
    }
  };

  // loading
  if (!self.preferences) {
    return <Loading className="v-centered" center />;
  }

  return (
    <>
      <Modal visible={showFriendslist && typeof socket !== "undefined"} setVisible={setShowFriendslist}>
        <FriendsList
          socket={socket!} // eslint-disable-line @typescript-eslint/no-non-null-assertion
          sessionId={sessionId}
          closeFriendsList={() => setShowFriendslist(false)}
          steamId={self.steamId}
        />
      </Modal>
      <Modal visible={showSettingsModal} setVisible={setShowSettingsModal}>
        <Container className="settings-modal">
          <div className="settings-header">
            <h2>Settings</h2>
            <AddButton onClick={() => setShowSettingsModal(false)} className="close-btn" />
          </div>
          <Settings settings={props.settings} setSettings={updateSettings} isHost={initiatorId === self.steamId} />
        </Container>
      </Modal>
      <CustomGameInput
        visible={showCustomGameInput}
        close={() => setShowCustomGameInput(false)}
        addGame={addCustomGame}
        validateGame={validateCustomGame}
        addError={props.addError}
      />
      <Confirmation
        visible={showLeaveModal}
        onAbort={() => setShowLeaveModal(false)}
        onConfirm={() => navigate("/create")}
        text="Do you really want to leave this session?"
        confirmText="Leave Session"
      />
      <header className="header">
        <h1 className="title" onClick={() => setShowLeaveModal(true)}>
          {showFullName ? "Common Steam Games" : "C.S.G."}
        </h1>
        <Button onClick={() => setShowSettingsModal(true)} className="show-settings-btn">
          Settings
        </Button>
      </header>
      <Container
        titles={["Your Preferences", "Group Preferences", "Peers Preferences"]}
        minTitles={["You", "Group", "Peers"]}
      >
        <GamesList
          games={self.preferences ?? []}
          onlyCommonGames={props.settings.onlyCommonGames}
          commonAppIds={commonAppIds}
          onDragEnd={onDragEnd}
          droppableId={`${self.personaname}'s Preferences`}
          gameSearch={gameSearch}
          header={
            <UserHeader
              title="Your Preferences"
              user={self}
              onSearch={setGameSearch}
              onSortByTotal={() => sortPreferences("total")}
              onSortByLastTwoWeeks={() => sortPreferences("recent")}
            />
          }
        />
        <GamesList
          games={matchedGames}
          onlyCommonGames={props.settings.onlyCommonGames}
          commonAppIds={commonAppIds}
          header={
            <GroupHeader
              title="Group Preferences"
              gamesCount={matchedGames.length}
              commonGames={props.settings.onlyCommonGames}
              addCustomGame={() => setShowCustomGameInput(true)}
              canAddCustomGames={initiatorId === self.steamId || props.settings.allCanAddCustomGames}
            />
          }
        />
        <div className="peers">
          <Invite
            sessionId={sessionId}
            className={users.length > 0 ? "no-br-bottom" : ""}
            openFriendsList={() => setShowFriendslist(true)}
          />
          {users.map((user, index) => (
            <Collapsible
              header={<UserHeader title={`${user.personaname}'s preferences`} user={user} className="no-br no-bg" />}
              key={`${index}-${user.steamId}`}
              title={`Show ${user.personaname ?? user.realname}'s' preferences`}
            >
              <GamesList
                games={user.preferences ?? []}
                onlyCommonGames={props.settings.onlyCommonGames}
                commonAppIds={commonAppIds}
                key={index}
                className="no-br-top"
              />
            </Collapsible>
          ))}
        </div>
      </Container>
    </>
  );
}

export default Matching;
