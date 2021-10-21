import React from 'react'

export default function Button(props: {
  className?: string,
  text?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}) {
  return (
    <button
      className={`btn ${props.className ?? ""}`}
      onClick={props.onClick}
    >
      {props.text ?? ""}
    </button>
  )
}
