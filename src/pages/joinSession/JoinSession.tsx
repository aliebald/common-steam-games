import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import AboutTeaser from '../../components/aboutTeaser/AboutTeaser';

export default function JoinSession(props: {
  sessionId?: string,
  steamId?: string,
  onSubmit: (steamId: string, sessionId: string) => void,
  id?: string
}) {
  const [steamId, setSteamId] = useState<string>(props.steamId ?? "");
  const [sessionId, setSessionId] = useState<string>(props.sessionId ?? "");
  const history = useHistory();
  const handleSteamIdChange = (event: any) => {
    setSteamId(event.target.value);
  }

  const handleSessionIdChange = (event: any) => {
    setSessionId(event.target.value);
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    props.onSubmit(steamId, sessionId);
    history.push("/matching");
  }

  return (
    <div className="user-forms">
      <div className="join-session">
        <h2>Join a Session</h2>
        <form className="d-table" onSubmit={handleSubmit}>
          <div className="d-table-row">
            <label htmlFor="joinSessionSteamId" className="d-table-cell">Steam ID or Profile URL:</label>
            <div className="steamId-input input-margin">
              <span className="profile-url">https://steamcommunity.com/id/</span>
              <input
                type="text"
                name="steamId"
                id="joinSessionSteamId"
                onChange={handleSteamIdChange}
                className="d-table-cell"
                defaultValue={steamId}
                placeholder="Steam ID or Profile URL"
                required
              />
            </div>
          </div>
          <div className="d-table-row">
            <label htmlFor="sessionId" className="d-table-cell">Session ID:&nbsp;</label>
            <input type="text"
              name="sessionId"
              id="sessionId"
              onChange={handleSessionIdChange}
              className="d-table-cell input-margin"
              defaultValue={sessionId}
              placeholder="Session ID"
              required
            />
          </div>
          <div className="d-table-row">
            <div className="d-table-cell"></div>
            <div className="d-table-cell">
              <input type="submit" value="Join Session" className="btn" />
            </div>
          </div>
        </form>
        <p className="t-center">
          Or <Link to="/">create a new session</Link>
        </p>
        <AboutTeaser />
      </div>
    </div>
  )
}
