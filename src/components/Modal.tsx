import React from "react"
import "./../styles/modal.css"

export default function Modal(props: {
  children: JSX.Element,
  visible: boolean,
  setVisible: (visible: boolean) => void
}) {
  if (!props.visible) {
    return <></>;
  }

  const close = () => {
    props.setVisible(false);
  }

  return (
    <div className="modal">
      <div className="blur-bg" onClick={close}></div>
      {props.children}
    </div>
  )
}
