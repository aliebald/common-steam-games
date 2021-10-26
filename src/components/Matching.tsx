import { useEffect, useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import Collapsible from './Collapsible';
import GamesList from './GamesList';
import Invite from './Invite';
import Loading from './Loading';
import UserHeader from './UserHeader';
import { io, Socket } from "socket.io-client";
import { useHistory } from 'react-router';

function initiateSocket(steamId: string, sessionId?: string) {
  let query;
  if (sessionId) {
    query = { steamId: steamId, sessionId: sessionId };
  } else {
    query = { steamId: steamId };
  }
  return io("http://localhost:3030", {
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
      err.timeout = 5000;
      props.addError(err);
      history.goBack();
    }

    if (socket) {
      socket.removeAllListeners();

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
      history.push("/create");
    });
    socket.io.on("reconnect_attempt", (attempt) => {
      console.log(`Attempting to reconnect. Attempt (${attempt}/${socket.io.reconnectionAttempts()})`);
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
    return <div className="t-center"><Loading className="v-centered" /></div >
  }

  return (
    <>
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
        <GamesList games={matchedGames} header={<h2 className="group-preferences-header">Group Preferences</h2>} className="col" />
        <div className="col">
          <Invite sessionId={sessionId} className="no-br-bottom" />
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
  users.forEach(user => {
    if (user.preferences) {
      user.preferences.forEach((game, index) => {
        const weight = getWeight(index, user.preferences!.length);
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

function getWeight(index: number, numGames: number): number {
  return (numGames - index) / numGames;
}

const reorder = (games: Game[], startIndex: number, endIndex: number) => {
  const result = Array.from(games);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export default Matching;
