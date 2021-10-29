import React from 'react'

export default function Button(props: {
  className?: string,
  onClick?: React.MouseEventHandler<HTMLButtonElement>,
  danger?: boolean,
  children?: JSX.Element | string
}) {
  const danger = props.danger ? " danger" : ""
  return (
    <button
      className={`btn${danger} ${props.className ?? ""}`}
      onClick={props.onClick}
    >
      {props.children ?? ""}
    </button>
  )
}
