import React from "react"
import Button from "./Button"
import "../styles/userCard.css"

export default function UserCard(props: {
  user: User,
  className?: string
}) {
  const openSteamChat = () => {
    window.open(`steam://friends/message/${props.user.steamId}`);
  }

  return (
    <div className={`user-card ${props.className ?? ""}`}>
      <a href={props.user.profileurl} target="_blank" rel="noopener noreferrer" title="Steam profile">
        <img src={props.user.avatarmedium} alt="avatar" height="64px" width="64px" />
      </a>
      <div className="user-details">
        <h3>{props.user.personaname}</h3>
        <span><em>{props.user.realname}</em></span>
        <br />
      </div>
      <Button onClick={openSteamChat}>
        Chat
      </Button>
    </div>
  )
}
