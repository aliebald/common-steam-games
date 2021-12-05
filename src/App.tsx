import React, { useState } from "react";
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import CreateSession from "./pages/createSession/CreateSession";
import Footer from "./components/footer/Footer";
import JoinSession from "./pages/joinSession/JoinSession";
import UnknownPage from "./pages/unknownPage/UnknownPage";
import Matching from "./pages/matching/Matching";
import ErrorList from "./components/errorList/ErrorList";
import About from "./pages/about/About";
// import packageJSON from "../package.json"
import "./styles/app.css";

export default function App(this: any) {
  const [steamId, setSteamId] = useState<string | undefined>(getSteamId());
  const [joinSessionId, setJoinSessionId] = useState<string | undefined>(getSessionId());
  const [errors, setErrors] = useState<ErrorType[]>([]);
  const [settings, setSettings] = useState<Settings>({
    onlyCommonGames: false,
    allCanAddCustomGames: true,
    defaultSort: "total"
  });

  const addError = (error: ErrorType) => {
    setErrors(errors.concat(error));
  };

  const createNewSession = (steamId: string) => {
    sessionStorage.setItem("steamId", steamId);
    sessionStorage.removeItem("sessionId");

    setSteamId(steamId);
    setJoinSessionId(undefined);
  };

  const joinSession = (steamId: string, sessionId: string) => {
    sessionStorage.setItem("steamId", steamId);
    sessionStorage.setItem("sessionId", sessionId);

    setSteamId(steamId);
    setJoinSessionId(sessionId);
  };

  return (
    <>
      <ErrorList errors={errors} setErrors={setErrors} />
      <Router>
        {/*basename={packageJSON.subUrl}*/}
        <Switch>
          <Route path="/matching" exact>
            {!steamId ? (
              <Redirect to="/" />
            ) : (
              <Matching
                steamId={steamId}
                sessionId={joinSessionId}
                addError={addError}
                settings={settings}
                setSettings={setSettings}
              />
            )}
          </Route>
          <Route path="/join" exact>
            {canAutoJoin() ? (
              <Redirect to="/matching" push />
            ) : (
              <JoinSession onSubmit={joinSession} sessionId={joinSessionId} steamId={steamId} />
            )}
          </Route>
          <Route path="/create" exact>
            <CreateSession
              onSubmit={createNewSession}
              steamId={steamId}
              settings={settings}
              setSettings={setSettings}
            />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/" exact>
            <Redirect to="/create" />
          </Route>
          <Route path="/">
            <UnknownPage />
          </Route>
        </Switch>
        <Footer />
      </Router>
      <div className="background" />
    </>
  );
}

/**
 * Checks if a session id was passed in the url or is cached in the sessionStorage
 * @returns sessionId (string) or undefined
 */
function getSessionId(): string | undefined {
  const urlParams = new URLSearchParams(window.location.search);
  const encodedSessionId = urlParams.get("sessionId");
  if (encodedSessionId) {
    const sessionId = decodeURIComponent(encodedSessionId);
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

const canAutoJoin = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.has("steamId") && urlParams.has("sessionId");
};
