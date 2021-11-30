import React from "react"
import "./addButton.css"

export default function AddButton(props: {
  className?: string,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  title?: string
}) {
  return (
    <button
      className={`add-btn ${props.className ?? ""}`}
      onClick={props.onClick}
      title={props.title}
    >
      <div></div>
      <div></div>
    </button>
  )
}
