import React, { useState } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import CreateSession from "./pages/createSession/CreateSession";
import Footer from "./components/footer/Footer";
import JoinSession from "./pages/joinSession/JoinSession";
import UnknownPage from "./pages/unknownPage/UnknownPage";
import Matching from "./pages/matching/Matching";
import ErrorList from "./components/errorList/ErrorList";
import About from "./pages/about/About";
// import packageJSON from "../package.json"
import { Logger, LoggerProvider } from "./Logger";
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
  const logger = new Logger();

  const addError = (error: ErrorType) => {
    setErrors(errors.concat(error));
  };

  const createNewSession = (steamId: string) => {
    localStorage.setItem("steamId", steamId);
    sessionStorage.removeItem("sessionId");

    setSteamId(steamId);
    setJoinSessionId(undefined);
  };

  const joinSession = (steamId: string, sessionId: string) => {
    localStorage.setItem("steamId", steamId);
    sessionStorage.setItem("sessionId", sessionId);

    setSteamId(steamId);
    setJoinSessionId(sessionId);
  };

  return (
    <LoggerProvider value={logger}>
      <ErrorList errors={errors} setErrors={setErrors} />
      <HashRouter>
        <Routes>
          <Route
            path="/matching"
            element={
              !steamId ? (
                <Navigate to="/" replace />
              ) : (
                <Matching
                  steamId={steamId}
                  sessionId={joinSessionId}
                  addError={addError}
                  settings={settings}
                  setSettings={setSettings}
                />
              )
            }
          />
          <Route
            path="/join"
            element={
              canAutoJoin() ? (
                <Navigate to="/matching" />
              ) : (
                <JoinSession onSubmit={joinSession} sessionId={joinSessionId} steamId={steamId} />
              )
            }
          />
          <Route
            path="/create"
            element={
              <CreateSession
                onSubmit={createNewSession}
                steamId={steamId}
                settings={settings}
                setSettings={setSettings}
              />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Navigate to="/create" replace />} />
          <Route path="*" element={<UnknownPage />} />
        </Routes>
        <Footer />
      </HashRouter>
      <div className="background" />
    </LoggerProvider>
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
    localStorage.setItem("steamId", steamId);
    return steamId;
  }
  const cachedSteamId = localStorage.getItem("steamId");
  if (cachedSteamId) {
    return cachedSteamId;
  }
  return undefined;
}

const canAutoJoin = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.has("steamId") && urlParams.has("sessionId");
};
