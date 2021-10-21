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
import "./styles/app.css";

export default function App(this: any) {
  const [steamId, setSteamId] = useState<string | undefined>(undefined);
  const [joinSessionId, setJoinSessionId] = useState<string | undefined>(autoLogin());

  const createNewSession = (steamId: string) => {
    sessionStorage.setItem("steamId", steamId);
    setSteamId(steamId);
  }

  const joinSession = (steamId: string, sessionId: string) => {
    sessionStorage.setItem("steamId", steamId);
    sessionStorage.setItem("sessionId", sessionId);

    setSteamId(steamId);
    setJoinSessionId(sessionId);
  }

  const canAutoJoin = joinSessionId && window.location.pathname !== "/join";
  const matching = steamId ? <Matching steamId={steamId} sessionId={joinSessionId} /> : <Redirect to="/" />

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/matching" exact>
            {matching}
          </Route>
          <Route path="/join" exact>
            <JoinSession onSubmit={joinSession} sessionId={joinSessionId} />
          </Route>
          <Route path="/create" exact>
            {canAutoJoin ? <Redirect to="/join" /> : <CreateSession onSubmit={createNewSession} />}
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
    </div>
  )
}

function autoLogin(): string | undefined {
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get("sessionId");
  if (sessionId) {
    sessionStorage.setItem("sessionId", sessionId);
    return decodeURIComponent(sessionId);
  }
  return undefined;
}
