import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';

export default function CreateSession(props: {
  name?: string,
  steamId?: string,
  onSubmit: (steamId: string) => void,
}) {
  const [steamId, setSteamId] = useState<string>("");
  const history = useHistory();

  const handleSteamIdChange = (event: any) => {
    setSteamId(event.target.value);
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    props.onSubmit(steamId);
    history.push("/matching");
  }

  return (
    <div className="user-forms">
      <div className="create-session">
        <h2>Create a new Session</h2>
        <form onSubmit={handleSubmit}>
          <label>Steam Id:
            <input type="text"
              name="steamId"
              id="createSessionSteamId"
              onChange={handleSteamIdChange}
              className="d-table-cell"
              required
            />
          </label>
          <input type="submit" value="Create New Session" className="btn" />
        </form>
        <p className="t-center">
          Or <Link to="/join">join a existing session</Link>
        </p>
      </div>
    </div>
  )
}
