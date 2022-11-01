import { io } from "socket.io-client";

/**
 * Initiates a Socket IO socket.
 *
 * @param steamId
 * @param settings
 * @param sessionId
 */
export function initiateSocket(steamId: string, settings: Settings, sessionId?: string) {
  let query;
  if (sessionId) {
    query = { steamId: steamId, sessionId: sessionId };
  } else {
    query = { steamId: steamId, settings: JSON.stringify(settings) };
  }
  const url =
    process.env.NODE_ENV === "production" ? "https://common-steam-games.up.railway.app/" : "http://localhost:3030";
  return io(url, {
    query: query,
    reconnectionAttempts: 4
  });
}

/**
 * Preference matching function.
 * Takes users with preferences and returns ordered matches with a corresponding weight between 0 and 1.
 *
 * @param users all users, including self.
 * @param commonAppIds If empty, all games will be matched. Otherwise list of common appIds, only common games will be matched
 * @returns Array with matched games
 */
export function calculatePreferences(users: User[], commonAppIds: number[]): MatchedGame[] {
  const matchedGames: Map<number, MatchedGame> = new Map();
  const maxGames =
    commonAppIds.length > 0
      ? commonAppIds.length
      : Math.max(...users.map((user) => (user.preferences ? user.preferences.length : 0)));

  users.forEach((user) => {
    if (user.preferences) {
      const preferences =
        commonAppIds.length > 0
          ? user.preferences.filter((pref) => commonAppIds.includes(pref.appid))
          : user.preferences;

      preferences.forEach((game, index) => {
        const weight = getWeight(index, maxGames - 1);
        let matchedGame = matchedGames.get(game.appid);
        // Check if the game already exists. Otherwise add it to matchedGames.
        if (matchedGame) {
          matchedGame.weight += weight / users.length;
          matchedGame.playtime_forever += game.playtime_forever / users.length;
          if (matchedGame.owners) {
            matchedGame.owners.push(user);
          }
        } else {
          matchedGame = {
            appid: game.appid,
            name: game.name,
            img_icon_url: game.img_icon_url,
            playtime_2weeks: game.playtime_2weeks ? game.playtime_2weeks / users.length : undefined,
            playtime_forever: game.playtime_forever / users.length,
            isCustom: game.isCustom,
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

  return result;
}

/** Weight function for calculatePreferences */
function getWeight(index: number, maxGames: number): number {
  const weight = (maxGames - index) / maxGames;
  return !isNaN(weight) && weight >= 0 ? weight * weight : 0;
}

export function reorderGames(games: Game[], startIndex: number, endIndex: number) {
  const result = Array.from(games);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

/** Gets a list with appids for games owned by all users (incl. self) */
export function getCommonAppIds(users: User[]) {
  const appOwners: { appid: number; owners: number }[] = [];
  let maxOwners = users.length;
  for (const user of users) {
    if (!user.preferences) {
      maxOwners--;
      continue;
    }
    for (const game of user.preferences) {
      const index = appOwners.findIndex((elem) => elem.appid === game.appid);
      if (index >= 0) {
        appOwners[index].owners++;
      } else {
        appOwners.push({ appid: game.appid, owners: 1 });
      }
    }
  }
  const ids = appOwners.filter((elem) => elem.owners >= maxOwners).map((elem) => elem.appid);
  return ids;
}
