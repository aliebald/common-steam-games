import { useEffect, useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { io, Socket } from "socket.io-client";
import { useHistory } from "react-router";
import Collapsible from "./Collapsible";
import GamesList from "./GamesList";
import Invite from "./Invite";
import Loading from "./Loading";
import UserHeader from "./UserHeader";
import GroupHeader from "./GroupHeader";
import FriendsList from "./FriendsList";
import Settings from "./Settings";
import Container from "./Container";

function initiateSocket(steamId: string, sessionId?: string) {
  let query;
  if (sessionId) {
    query = { steamId: steamId, sessionId: sessionId };
  } else {
    query = { steamId: steamId };
  }
  const url = process.env.NODE_ENV === "production" ? "https://common-steam-games.herokuapp.com/" : "http://localhost:3030";
  return io(url, {
    query: query,
    reconnectionAttempts: 4
  });
}

function Matching(props: {
  steamId: string,
  sessionId?: string,
  addError: (error: ErrorType) => void
}) {
  const [users, setUsers] = useState<User[]>([]);
  const [self, setSelf] = useState<User>({ steamId: props.steamId });
  const [matchedGames, setMatchedGames] = useState<MatchedGame[]>([]);
  const [sessionId, setSessionId] = useState<string>("");
  const [preferencesChanged, setPreferencesChanged] = useState(false);
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const [showFriendslist, setShowFriendslist] = useState<boolean>(false);
  const [settings, setSettings] = useState<Settings>({ onlyCommonGames: true });
  const [commonAppIds, setCommonAppIds] = useState<number[]>([]);
  const [gameSearch, setGameSearch] = useState("");

  const history = useHistory();

  /** updates settings (state) and sends updateSettings event to backend */
  const updateSettings = (settings: Settings) => {
    if (socket) {
      console.log("Sending settings");
      socket.emit("updateSettings", settings);
    }
    setSettings(settings);
  }

  useEffect(() => {
    setCommonAppIds(getCommonAppIds(users.concat(self)));
  }, [users, self])

  useEffect(() => {
    const handleSession = (msg: any) => {
      console.log("Received session:", msg);
      if (!msg) return;
      if (users.length > 0) {
        console.warn("Received session but already is part of a session");
        return;
      }

      const session = msg as Session;
      const ownSteamId = session.you ?? self.steamId;
      const newUsers = session.users.filter(user => user.steamId !== ownSteamId);
      const newSelf = session.users.find(user => user.steamId === ownSteamId);
      if (!newSelf) {
        props.addError({ status: 400, msg: "Failed to connect to session. Did not find self." });
        if (socket) socket.disconnect();
        history.replace("/create");
        return;
      }

      setSessionId(session.sessionId);
      setSelf(newSelf);
      setUsers(newUsers);
      if (session.settings) {
        setSettings(session.settings);
      }
    }

    const handleUserJoined = (msg: any) => {
      console.log("Received handleUserJoined:", msg, "users:", users);
      const newUsers = [...users];
      newUsers.push(msg as User);
      setUsers(newUsers);
    }

    const handleUserDisconnect = (msg: any) => {
      console.log("Received handleUserDisconnect:", msg, "users:", users);
      const newUsers = users.filter(user => user.steamId !== msg as string);
      setUsers(newUsers);
    }

    const handleUpdateSettings = (msg: any) => {
      console.log("Received settings:", msg);
      setSettings(msg as Settings);
    }

    const handleUpdatePreferences = (msg: any) => {
      console.log("Received updatePreferences:", msg);
      const data = msg as PreferencesUpdate;
      // TODO check data

      const newUsers = [...users];
      const changedUserIndex = newUsers.findIndex(user => user.steamId === data.steamId);
      if (changedUserIndex !== -1) {
        console.log(`Updating preferences for ${newUsers[changedUserIndex].personaname} (${data.steamId})`, changedUserIndex);
        newUsers[changedUserIndex].preferences = data.preferences;
        setUsers(newUsers);
      } else {
        console.log(`Tried to update preferences for ${data.steamId} but did not find user`);
      }
    }

    const handleError = (error: any) => {
      const err = error as ErrorType;
      err.timeout = 15000;
      props.addError(err);
      if (err.status === 550) {
        setShowFriendslist(false);
        return;
      }
      if (socket) socket.disconnect();
      history.replace("/create");
    }

    if (socket) {
      socket.removeAllListeners("error");
      socket.removeAllListeners("session");
      socket.removeAllListeners("userJoined");
      socket.removeAllListeners("userDisconnect");
      socket.removeAllListeners("updateSettings");
      socket.removeAllListeners("updatePreferences");

      socket.on("error", handleError);
      socket.on("session", handleSession);
      socket.on("userJoined", handleUserJoined);
      socket.on("userDisconnect", handleUserDisconnect);
      socket.on("updateSettings", handleUpdateSettings);
      socket.on("updatePreferences", handleUpdatePreferences);
    }
  }, [self.steamId, users, socket, props, history]);

  useEffect(() => {
    const socket = initiateSocket(props.steamId, props.sessionId);
    setSocket(socket);

    socket.io.on("reconnect_failed", () => {
      console.log("Failed to reconnect");
      props.addError({ status: 500, msg: "Lost connection to server", timeout: 15000 });
      history.push("/create");
    });
    socket.io.on("reconnect_attempt", (attempt) => {
      const msg = `Lost connection to server, attempting to reconnect. Attempt (${attempt}/${socket.io.reconnectionAttempts()})`
      console.log(msg);
      props.addError({ status: 500, msg: msg, timeout: 6000 });
    });

    return () => {
      console.log("#### disconnecting ###");
      if (socket) socket.disconnect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.sessionId, props.steamId]);

  // Update group preferences
  useEffect(() => {
    console.log("calculatePreferences");
    const appIds = settings.onlyCommonGames ? commonAppIds : [];
    setMatchedGames(calculatePreferences(users.concat(self), appIds));
  }, [users, self, settings.onlyCommonGames, commonAppIds]);

  // Send preferences to backend when changed
  useEffect(() => {
    if (!preferencesChanged || !self.preferences) return;
    if (!socket) {
      console.error("Socket is not defined");
      return;
    }
    console.log("Sending preferences");
    socket.emit("updatePreferences", self.preferences);
    setPreferencesChanged(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [self.preferences, preferencesChanged])

  const onDragEnd = (result: DropResult): void => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const newSelf: User = { ...self } as User;
    newSelf.preferences = reorder(
      (self as User).preferences ?? [],
      result.source.index,
      result.destination.index
    );
    if (gameSearch.length > 0) {
      // Reset game search to avoid unwanted scrolling after changing preferences.
      // Does not update value in UserHeader so the user can build upon the old search query.
      setGameSearch("");
    }
    setSelf(newSelf);
    setPreferencesChanged(true);
  }

  const sortPreferences = (sortBy: "total" | "recent") => {
    // select the correct sort function dependant on the sortBy argument
    let sortFunc: (a: Game, b: Game) => number;
    if (sortBy === "total") {
      sortFunc = (a: Game, b: Game) => b.playtime_forever - a.playtime_forever
    } else {
      sortFunc = (a: Game, b: Game) => {
        const aPlaytime = a.playtime_2weeks ?? 0;
        const bPlaytime = b.playtime_2weeks ?? 0;
        if (aPlaytime === bPlaytime) {
          // Fallback if playtime in the last two weeks is equal
          return b.playtime_forever - a.playtime_forever;
        }
        return bPlaytime - aPlaytime;
      }
    }
    // Sort preferences using sortFunc
    const newSelf: User = { ...self };
    if (newSelf.preferences) {
      newSelf.preferences = newSelf.preferences.sort(sortFunc);
      setSelf(newSelf);
      setPreferencesChanged(true);
    }
  }

  // loading 
  if (!self.preferences) {
    return <Loading className="v-centered" center />
  }

  return (
    <>
      {showFriendslist && socket ? <FriendsList socket={socket} sessionId={sessionId} closeFriendsList={() => setShowFriendslist(false)} /> : ""}
      <header className="app-header">
        <h1 className="title">Common Steam Games</h1>
        <Settings settings={settings} setSettings={updateSettings} />
      </header>
      <Container
        titles={["Your Preferences", "Group Preferences", "Peers Preferences"]}
        minTitles={["You", "Group", "Peers"]}
      >
        <GamesList
          games={self.preferences ?? []}
          onlyCommonGames={settings.onlyCommonGames}
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
          onlyCommonGames={settings.onlyCommonGames}
          commonAppIds={commonAppIds}
          header={<GroupHeader title="Group Preferences" gamesCount={matchedGames.length} commonGames={settings.onlyCommonGames} />}
        />
        <div className="peers">
          <Invite sessionId={sessionId} className="no-br-bottom" openFriendsList={() => setShowFriendslist(true)} />
          {users.map((user, index) =>
            <Collapsible
              header={<UserHeader title={`${user.personaname}'s preferences`} user={user} className="no-br no-bg" />}
              key={`${index}-${user.steamId}`}
              title={`Show ${user.personaname ?? user.realname}'s' preferences`}
            >
              <GamesList
                games={user.preferences ?? []}
                onlyCommonGames={settings.onlyCommonGames}
                commonAppIds={commonAppIds}
                key={index}
                className="no-br-top"
              />
            </Collapsible>
          )}
        </div>
      </Container>
    </>
  );
}

function calculatePreferences(users: User[], commonAppIds: number[]): MatchedGame[] {
  const matchedGames: Map<number, MatchedGame> = new Map();
  const maxGames = commonAppIds.length > 0 ? commonAppIds.length : (
    Math.max(...users.map(user => user.preferences ? user.preferences.length : 0)));

  users.forEach(user => {
    if (user.preferences) {
      const preferences = commonAppIds.length > 0 ? (
        user.preferences.filter(pref => commonAppIds.includes(pref.appid))
      ) : user.preferences;

      preferences.forEach((game, index) => {
        const weight = getWeight(index, maxGames - 1);
        let matchedGame: MatchedGame;
        // Check if the game already exists. Otherwise add it to matchedGames.
        if (matchedGames.has(game.appid)) {
          matchedGame = matchedGames.get(game.appid)!;
          matchedGame.weight += weight / users.length;
          matchedGame.playtime_forever += game.playtime_forever / users.length;
          if (matchedGame.owners) {
            matchedGame.owners.push(user)
          }
        } else {
          matchedGame = {
            appid: game.appid,
            name: game.name,
            img_icon_url: game.img_icon_url,
            img_logo_url: game.img_logo_url,
            has_community_visible_stats: game.has_community_visible_stats ?? undefined,
            playtime_2weeks: game.playtime_2weeks ? (game.playtime_2weeks / users.length) : undefined,
            playtime_forever: game.playtime_forever / users.length,
            weight: weight / users.length,
            owners: [user]
          };
        }
        matchedGames.set(game.appid, matchedGame);
      });
    }
  });
  const result = Array.from(matchedGames.values());
  result.sort((a, b) => b.weight - a.weight);

  return result
}

function getWeight(index: number, maxGames: number): number {
  const weight = (maxGames - index) / maxGames;
  return (!isNaN(weight) && weight >= 0) ? weight * weight : 0;
}

const reorder = (games: Game[], startIndex: number, endIndex: number) => {
  const result = Array.from(games);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

/** Gets a list with appids for games owned by all users (incl. self) */
const getCommonAppIds = (users: User[]) => {
  const appOwners: { appid: number, owners: number }[] = [];
  let maxOwners = users.length;
  for (const user of users) {
    if (!user.preferences) {
      maxOwners--;
      continue;
    }
    for (const game of user.preferences) {
      const index = appOwners.findIndex(elem => elem.appid === game.appid);
      if (index >= 0) {
        appOwners[index].owners++;
      } else {
        appOwners.push({ appid: game.appid, owners: 1 });
      }
    }
  }
  const ids = appOwners.filter(elem => elem.owners >= maxOwners).map(elem => elem.appid);
  return ids;
}

export default Matching;
