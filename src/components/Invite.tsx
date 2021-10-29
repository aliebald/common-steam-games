import React from "react"
import packageJSON from "../../package.json"
import Button from "./Button";
import "../styles/invite.css"

export default function Invite(props: {
  sessionId: string,
  className?: string,
  openFriendsList: () => void;
}) {
  const invite = `${window.location.origin}${packageJSON.subUrl}/join?sessionId=${encodeURIComponent(props.sessionId)}`;
  const copyInvite = () => {
    navigator.clipboard.writeText(invite);
  }
  const handleFocus = (event: any) => {
    event.target.select()
  }

  return (
    <div className={`invite-box ${props.className ?? ""}`}>
      <label>Invite your friends</label>
      <div className="invite-row">
        <input className="invite-input" type="text" value={invite} readOnly onFocus={handleFocus} />
        <Button onClick={copyInvite}>Copy&nbsp;Invite</Button>
        <Button onClick={props.openFriendsList}>Open&nbsp;Friends&nbsp;List</Button>
      </div>
    </div>
  )
}
