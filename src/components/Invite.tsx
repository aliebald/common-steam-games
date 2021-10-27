import React from 'react'
import packageJSON from "../../package.json"
import "../styles/invite.css"

export default function Invite(props: {
  sessionId: string,
  className?: string
}) {
  const invite = `${window.location.origin}${packageJSON.subUrl}/join?sessionId=${encodeURIComponent(props.sessionId)}`;
  return (
    <div className={`inviteBox ${props.className ?? ""}`}>
      Invite&nbsp;Link:&nbsp;
      <a href={invite} target="_blank" rel="noopener noreferrer">
        {props.sessionId}
      </a>
    </div>
  )
}
