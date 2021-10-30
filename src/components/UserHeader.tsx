import React from "react"
import "../styles/headers.css"

export default function UserHeader(props: {
  title: string,
  user: User,
  className?: string
}) {
  return (
    <div className={`user-header ${props.className ?? ""}`}>
      <a href={props.user.profileurl} target="_blank" rel="noopener noreferrer" title="Steam profile">
        <img
          src={props.user.avatarmedium}
          width="45"
          height="45"
          alt="avatar"
        />
      </a>
      <div className="user-details">
        <h2>{props.title}</h2>
        {props.user.preferences ? <div>{props.user.preferences.length}&nbsp;Games</div> : ""}
      </div>
    </div>
  )
}
