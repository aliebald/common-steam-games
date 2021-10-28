import React from 'react'

export default function Button(props: {
  className?: string,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  children?: JSX.Element | string
}) {
  return (
    <button
      className={`btn ${props.className ?? ""}`}
      onClick={props.onClick}
    >
      {props.children ?? ""}
    </button>
  )
}
