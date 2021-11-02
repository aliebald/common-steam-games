import React from "react"
import "../styles/headers.css"

export default function GroupHeader(props: {
  title: string,
  gamesCount: number,
  commonGames: boolean,
  className?: string
}) {
  return (
    <div className={`group-header ${props.className ?? ""}`}>
      <div className="group-details">
        <h2>{props.title}</h2>
        <div>{props.gamesCount}&nbsp;{props.commonGames ? "Common Games" : "Games"}</div>
      </div>
    </div>
  )
}
