import React from 'react'
import "../styles/loading.css"

export default function Loading(props: { className?: string }) {
  // Loading animation from https://loading.io/css/
  return (
    <div className={`lds-roller ${props.className ?? ""}`}>
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
}
