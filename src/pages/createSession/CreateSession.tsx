import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AboutTeaser from "../../components/aboutTeaser/AboutTeaser";
import Container from "../../components/container/Container";
import Settings from "../../components/settings/Settings";
import "./createSession.css";

export default function CreateSession(props: {
  steamId?: string;
  settings: Settings;
  setSettings: (settings: Settings) => void;
  onSubmit: (steamId: string) => void;
}) {
  const [steamId, setSteamId] = useState<string>(props.steamId ?? "");
  const history = useHistory();

  const handleSteamIdChange = (event: any) => {
    setSteamId(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    props.onSubmit(steamId);
    history.push("/matching");
  };

  return (
    <Container className="create-session">
      <h1 className="title">Common Steam Games</h1>
      <h2 className="subtitle">Create new Session</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="createSessionSteamId">Steam ID or Profile URL:</label>
        <div className="steamId-input input-margin">
          <span className="profile-url">https://steamcommunity.com/id/</span>
          <input
            type="text"
            name="steamId"
            id="createSessionSteamId"
            onChange={handleSteamIdChange}
            className="d-table-cell"
            defaultValue={steamId}
            placeholder="Steam ID or Profile URL"
            required
          />
        </div>
        <Settings
          isHost
          settings={props.settings}
          setSettings={props.setSettings}
          className="create-session-settings"
        />
        <input type="submit" value="Create New Session" className="btn" />
      </form>
      <p className="link-join">
        Or <Link to="/join">join existing session</Link>
      </p>
      <AboutTeaser />
    </Container>
  );
}
