import React from "react"
import "../styles/headers.css"

export default function GroupHeader(props: {
  title: string,
  gamesCount: number,
  commonGamesCount: number,
  className?: string
}) {
  return (
    <div className={`group-header ${props.className ?? ""}`}>
      <div className="group-details">
        <h2>{props.title}</h2>
        <div>{props.gamesCount}&nbsp;Games / {props.commonGamesCount}&nbsp;Common&nbsp;Games</div>
      </div>
    </div>
  )
}
