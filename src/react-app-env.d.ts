// <reference types=react-scripts />

type User = {
  steamId: string;
  communityvisibilitystate?: number;
  profilestate?: number;
  personaname?: string;
  commentpermission?: number;
  profileurl?: string;
  avatar?: string;
  avatarmedium?: string;
  avatarfull?: string;
  avatarhash?: string;
  lastlogoff?: number;
  personastate?: number;
  realname?: string;
  primaryclanid?: string;
  timecreated?: number;
  personastateflags?: number;
  loccountrycode?: string;
  preferences?: Game[];
}

type Friend = {
  steamId: string;
  avatarmedium: string;
  personaname: string;
  realname?: string;
  profileurl: string;
  filterSimilarity?: number;
}

type OwnedGamesResponse = {
  game_count: number;
  games: Game[];
}

type Game = {
  appid: number;
  name: string;
  img_icon_url: string;
  img_logo_url: string;
  has_community_visible_stats?: boolean;
  playtime_2weeks?: number;
  playtime_forever: number;
  playtime_windows_forever?: number;
  playtime_mac_forever?: number;
  playtime_linux_forever?: number;
}

type MatchedGame = Game & {
  weight: number;
}

type Session = {
  sessionId: string;
  initiatorId: string;
  timeout: number;
  users: User[];
  games?: Game[];
}

type PreferencesUpdate = {
  steamId: string;
  preferences: Game[];
}

type ErrorType = {
  status: number;
  msg: string;
  timeout?: number;
}
