import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import CreateSession from "./components/CreateSession";
import Footer from "./components/Footer";
import JoinSession from "./components/JoinSession";
import UnknownPage from "./components/UnknownPage";
import Matching from "./components/Matching";
import ErrorList from "./components/ErrorList"
import packageJSON from "../package.json"
import "./styles/app.css";

export default function App(this: any) {
  const [steamId, setSteamId] = useState<string | undefined>(getSteamId());
  const [joinSessionId, setJoinSessionId] = useState<string | undefined>(getSessionId());
  const [errors, setErrors] = useState<ErrorType[]>([]);

  const addError = (error: ErrorType) => {
    setErrors(errors.concat(error));
  }

  const createNewSession = (steamId: string) => {
    sessionStorage.setItem("steamId", steamId);
    sessionStorage.removeItem("sessionId");

    setSteamId(steamId);
    setJoinSessionId(undefined);
  }

  const joinSession = (steamId: string, sessionId: string) => {
    sessionStorage.setItem("steamId", steamId);
    sessionStorage.setItem("sessionId", sessionId);

    setSteamId(steamId);
    setJoinSessionId(sessionId);
  }

  const switchToJoinPage = joinSessionId && window.location.pathname !== `${packageJSON.subUrl}/join`;
  const matching = steamId ? <Matching steamId={steamId} sessionId={joinSessionId} addError={addError} /> : <Redirect to="/" />

  return (
    <div className="app">
      <ErrorList errors={errors} setErrors={setErrors} />
      <Router basename={packageJSON.subUrl}>
        <Switch>
          <Route path="/matching" exact>
            {matching}
          </Route>
          <Route path="/join" exact>
            <JoinSession onSubmit={joinSession} sessionId={joinSessionId} steamId={steamId} />
          </Route>
          <Route path="/create" exact>
            {switchToJoinPage ? <Redirect to="/join" /> : <CreateSession onSubmit={createNewSession} steamId={steamId} />}
          </Route>
          <Route path="/" exact>
            <Redirect to="/create" />
          </Route>
          <Route path="/">
            <UnknownPage />
          </Route>
        </Switch>
      </Router>
      <Footer />
      <div className="background" />
    </div>
  )
}

/**
 * Checks if a session id was passed in the url or is cached in the sessionStorage
 * @returns sessionId (string) or undefined
 */
function getSessionId(): string | undefined {
  const urlParams = new URLSearchParams(window.location.search);
  const encodedSessionId = urlParams.get("sessionId");
  if (encodedSessionId) {
    const sessionId = decodeURIComponent(encodedSessionId)
    sessionStorage.setItem("sessionId", sessionId);
    return sessionId;
  }
  const cachedSessionId = sessionStorage.getItem("sessionId");
  if (cachedSessionId) {
    return cachedSessionId;
  }
  return undefined;
}

/**
 * Checks if a steam id was passed in the url or is cached in the sessionStorage
 * @returns steamId (string) or undefined
 */
function getSteamId(): string | undefined {
  const urlParams = new URLSearchParams(window.location.search);
  const encodedSteamId = urlParams.get("steamId");
  if (encodedSteamId) {
    const steamId = decodeURIComponent(encodedSteamId);
    sessionStorage.setItem("steamId", steamId);
    return steamId;
  }
  const cachedSteamId = sessionStorage.getItem("steamId");
  if (cachedSteamId) {
    return cachedSteamId;
  }
  return undefined;
}
