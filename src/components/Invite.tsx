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
  const handleFocus = (event: any) => {
    event.target.select()
  }

  return (
    <div className={`invite-box ${props.className ?? ""}`}>
      <label>Invite your friends</label>
      <div className="invite-row">
        <input className="invite-input" type="text" value={invite} readOnly onFocus={handleFocus} />
        <Button onClick={copyInvite}>Copy&nbsp;Invite</Button>
        <Button>Open&nbsp;friends&nbsp;list</Button>
      </div>
    </div>
  )
}
