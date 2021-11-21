import React from "react"
import "./button.css"

export default function Button(props: {
  className?: string,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  danger?: boolean,
  title?: string,
  children?: JSX.Element | string
}) {
  const danger = props.danger ? " danger" : ""
  return (
    <button
      className={`btn${danger} ${props.className ?? ""}`}
      onClick={props.onClick}
      title={props.title}
    >
      {props.children ?? ""}
    </button>
  )
}
