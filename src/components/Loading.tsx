import React from 'react'
import "../styles/loading.css"

export default function Loading(props: {
  className?: string,
  center?: boolean
}) {
  // Loading animation from https://loading.io/css/
  const centerInner = props.center ? " v-centered" : ""
  const content = (
    <div className={`lds-roller${centerInner} ${props.className ?? ""}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )

  if (props.center) {
    return <div className="flex-center">{content}</div>;
  }

  return content;
}
