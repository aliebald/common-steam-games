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
  const history = useHistory();

  useEffect(() => {
    const handleSession = (msg: any) => {
      console.log("Received session:", msg);
      if (!msg) return;
      if (users.length > 0) {
        console.warn("Received session but already is part of a session");
        return;
      }

      const session = msg as Session;
      const newUsers = session.users.filter(user => user.steamId !== self.steamId);
      const newSelf = session.users.find(user => user.steamId === self.steamId);
      // TODO handle case: newSelf = undefined

      setSessionId(session.sessionId);
      setSelf(newSelf!); // TODO undefined check
      setUsers(newUsers);
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
      history.goBack();
    }

    if (socket) {
      socket.removeAllListeners("error");
      socket.removeAllListeners("session");
      socket.removeAllListeners("userJoined");
      socket.removeAllListeners("userDisconnect");
      socket.removeAllListeners("updatePreferences");

      socket.on("error", handleError);
      socket.on("session", handleSession);
      socket.on("userJoined", handleUserJoined);
      socket.on("userDisconnect", handleUserDisconnect);
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
    setMatchedGames(calculatePreferences(users.concat(self)));
  }, [users, self])

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
    setSelf(newSelf);
    setPreferencesChanged(true);
  }

  // loading 
  if (!self.preferences) {
    return <Loading className="v-centered" center />
  }

  return (
    <>
      {showFriendslist && socket ? <FriendsList socket={socket} sessionId={sessionId} closeFriendsList={() => setShowFriendslist(false)} /> : ""}
      <header className="app-header">
        <h1>Common Steam Games</h1>
      </header>
      <div className="container">
        <GamesList
          games={self.preferences ?? []}
          onDragEnd={onDragEnd}
          droppableId={`${self.personaname}'s Preferences`}
          header={<UserHeader title="Your Preferences" user={self} />}
          className="col"
        />
        <GamesList games={matchedGames} header={<GroupHeader title="Group Preferences" gamesCount={matchedGames.length} />} className="col" />
        <div className="col">
          <Invite sessionId={sessionId} className="no-br-bottom" openFriendsList={() => setShowFriendslist(true)} />
          {users.map((user, index) =>
            <Collapsible
              header={<UserHeader title={`${user.personaname}'s preferences`} user={user} className="no-br no-bg" />}
              key={`${index}-${user.steamId}`}
            >
              <GamesList games={user.preferences ?? []} key={index} className="no-br-top" />
            </Collapsible>
          )}
        </div>
      </div>
    </>
  );
}

function calculatePreferences(users: User[]): MatchedGame[] {
  const matchedGames: Map<number, MatchedGame> = new Map();
  const maxGames = Math.max(...users.map(user => user.preferences ? user.preferences.length : 0));
  users.forEach(user => {
    if (user.preferences) {
      user.preferences.forEach((game, index) => {
        const weight = getWeight(index, maxGames);
        let matchedGame: MatchedGame;
        // Check if the game already exists. Otherwise add it to matchedGames.
        if (matchedGames.has(game.appid)) {
          matchedGame = matchedGames.get(game.appid)!;
          matchedGame.weight += weight;
          matchedGame.playtime_forever += game.playtime_forever / users.length;
        } else {
          matchedGame = {
            appid: game.appid,
            name: game.name,
            img_icon_url: game.img_icon_url,
            img_logo_url: game.img_logo_url,
            has_community_visible_stats: game.has_community_visible_stats ?? undefined,
            playtime_2weeks: game.playtime_2weeks ? (game.playtime_2weeks / users.length) : undefined,
            playtime_forever: game.playtime_forever / users.length,
            weight: weight
          };
        }
        matchedGames.set(game.appid, matchedGame);
      })
    }
  });
  const result = Array.from(matchedGames.values());
  result.sort((a, b) => {
    return b.weight - a.weight;
  });

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

export default Matching;
