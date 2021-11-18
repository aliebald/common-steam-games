import React, { useEffect } from "react"
import "./../styles/modal.css"

export default function Modal(props: {
  children: JSX.Element,
  visible: boolean,
  setVisible: (visible: boolean) => void
}) {
  /* close if esc is pressed */
  useEffect(() => {
    const listener = (event: any) => {
      if (event.code === "Escape") {
        event.preventDefault();
        props.setVisible(false);
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [props]);

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
