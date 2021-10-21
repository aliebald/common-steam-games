import { useEffect, useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import Collapsible from './Collapsible';
import GamesList from './GamesList';
import Invite from './Invite';
import Loading from './Loading';
import UserHeader from './UserHeader';

function Matching(props: {
  steamId: string,
  sessionId?: string
}) {
  const [users, setUsers] = useState<User[]>([]);
  const [self, setSelf] = useState<User>({ steamId: props.steamId });
  const [matchedGames, setMatchedGames] = useState<MatchedGame[]>([]);
  const [sessionId, setSessionId] = useState<string>("");
  const [requestRunning, setRequestRunning] = useState(false);

  useEffect(() => {
    if (requestRunning) return;
    const update = async () => {
      if (sessionId === "") return;
      setRequestRunning(true);
      const session = await getSession(sessionId);
      if (session && session.users.length > 1) {
        const newUsers = session.users.filter(user => user.steamId !== self.steamId);
        setUsers(newUsers);
      }
      setRequestRunning(false);
    }
    const joinSession = async () => {
      setRequestRunning(true);
      if (!props.sessionId) return; // TODO error handling
      const url = `http://localhost:3030/joinSession?steamId=${encodeURIComponent(props.steamId)}&sessionId=${encodeURIComponent(props.sessionId)}`
      const response = await fetch(url);
      if (!response.ok || response.status !== 200) {
        return;
      }

      const session = await response.json() as Session;
      if (session) {
        console.log("got session", session);
        const newUsers = session.users.filter(user => user.steamId !== self.steamId);
        const newSelf = session.users.filter(user => user.steamId === self.steamId)[0];
        // TODO handle case: newSelf = undefined

        console.log("newUsers", newUsers);
        setSessionId(session.sessionId);
        setSelf(newSelf);
        setUsers(newUsers);
      }
      setRequestRunning(false);
    }

    if (sessionId === "") {
      if (props.sessionId) {
        // Join existing session
        joinSession();
      } else {
        // Create new session
        setRequestRunning(true);
        const success = createNewSession(props.steamId);
        if (!success) {
          console.warn("Failed to create a new session");
          // TODO error handling
        }
        setRequestRunning(false);
      }
    }

    // Update matches games
    setMatchedGames(calculatePreferences(users.concat(self)));

    // Update current session / fetch data
    const interval = setInterval(update, 2000);

    return () => clearInterval(interval);
  }, [requestRunning, users, self, sessionId, props.sessionId, props.steamId])

  const createNewSession = async (steamId: string) => {
    console.log("Creating session for", steamId);
    const url = `http://localhost:3030/createSession?steamId=${encodeURIComponent(steamId)}`;
    const response = await fetch(url);
    if (!response.ok || response.status !== 200) {
      return false;
    }
    const data = await response.json() as Session;
    if (data.users.length !== 1) {
      return false;
    }
    console.log(data);

    setSessionId(data.sessionId);
    setSelf(data.users[0]);
    return true;
  }

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
    sendPreferenceUpdate(sessionId, self.steamId, newSelf.preferences);
    setSelf(newSelf);
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

async function sendPreferenceUpdate(sessionId: string, steamId: string, preferences: Game[]) {
  console.log('Sending preferences');
  const init: RequestInit = {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(preferences)
  };
  console.log("requestInit:", init);

  const url = `http://localhost:3030/updatePreferences?sessionId=${encodeURIComponent(sessionId)}&steamId=${encodeURIComponent(steamId)}`;
  const response = await fetch(url, init);
  return response.ok && response.status === 200;
}

async function getSession(sessionId: string) {
  console.log('Requesting data');
  const response = await fetch(`http://localhost:3030/getSession?sessionId=${encodeURIComponent(sessionId)}`);
  if (!response.ok || response.status !== 200) {
    return;
  }
  const data = await response.json() as Session;
  return data;
}

export default Matching;
