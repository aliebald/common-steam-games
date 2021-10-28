import React from 'react'
import packageJSON from "../../package.json"
import "../styles/invite.css"
import Button from './Button';

export default function Invite(props: {
  sessionId: string,
  className?: string
}) {
  const invite = `${window.location.origin}${packageJSON.subUrl}/join?sessionId=${encodeURIComponent(props.sessionId)}`;
  const copyInvite = () => {
    navigator.clipboard.writeText(invite);
  }

  return (
    <div className={`inviteBox ${props.className ?? ""}`}>
      <label>Invite your friends
        <input className="invite-input" type="text" value={invite} />
      </label>
      <Button text="Copy Invite" onClick={copyInvite} />
      <Button text="Open friends list" />
    </div>
  )
}
