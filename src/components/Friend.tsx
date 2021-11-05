import React from "react"
import packageJSON from "../../package.json"
import Button from "./Button";

import "../styles/friend.css"

export default function Friend(props: {
  friend: Friend,
  sessionId: string
}) {
  const friend = props.friend;
  const personaname = (friend.personaname ?? friend.realname) ?? "";
  const invite = `${window.location.origin}${packageJSON.subUrl}/join?sessionId=${encodeURIComponent(props.sessionId)}&steamId=${props.friend.steamId}`;
  const copyInvite = () => {
    navigator.clipboard.writeText(invite);
  }
  const openSteamChat = () => {
    window.open(`steam://friends/message/${friend.steamId}`)
  }

  return (
    <div className="friend">
      <div className="friend-info">
        <a href={friend.profileurl} target="_blank" rel="noopener noreferrer" title="Steam profile">
          <img
            src={friend.avatarmedium}
            width="45"
            height="45"
            alt="avatar"
          />
        </a>
        <div className="friend-personal">
          <div>{friend.personaname ?? ""}</div>
          <div>{friend.realname ? <span>(<em>{friend.realname}</em>)</span> : ""}</div>
        </div>
      </div>
      <div className="buttons">
        <Button
          onClick={openSteamChat}
          title={`Opens the steam chat with ${personaname}, if steam is installed.`}
        >
          Steam&nbsp;Chat
        </Button>
        <Button
          onClick={copyInvite}
          title={`Copies a personalized invite for ${personaname}. This allows ${personaname} to join without entering a steamId`}
        >
          Copy&nbsp;Invite
        </Button>
      </div>
    </div>
  )
}
