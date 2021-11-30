import React from "react"
import "./button.css"

export default function Button(props: {
  className?: string,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  danger?: boolean,
  title?: string,
  type?: "button" | "submit" | "reset",
  children?: JSX.Element | string
}) {
  const danger = props.danger ? " danger" : ""
  return (
    <button
      className={`btn${danger} ${props.className ?? ""}`}
      onClick={props.onClick}
      title={props.title}
      type={props.type}
    >
      {props.children ?? ""}
    </button>
  )
}
