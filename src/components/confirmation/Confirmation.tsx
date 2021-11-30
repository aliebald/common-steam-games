import React, { useEffect } from "react"
import Button from "../button/Button"
import Modal from "../modal/Modal"
import "./confirmation.css"

export default function Confirmation(props: {
  text: string,
  abortText?: string,
  confirmText?: string,
  visible?: boolean,
  onAbort: () => void,
  onConfirm: () => void
}) {
  const handleModal = (visible: boolean) => {
    if (!visible) {
      props.onAbort();
    }
  }

  const confirm = (event: any) => {
    event.preventDefault();
    props.onConfirm();
  }
  const abort = (event: any) => {
    event.preventDefault();
    props.onAbort();
  }

  /* confirm if enter is pressed */
  useEffect(() => {
    const listener = (event: any) => {
      if (props.visible && (event.code === "Enter" || event.code === "NumpadEnter")) {
        event.preventDefault();
        props.onConfirm();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [props]);

  return (
    <Modal visible={props.visible ?? true} setVisible={handleModal}>
      <div className="confirmation">
        <p className="text">{props.text}</p>
        <div className="confirmation-footer">
          <Button onClick={abort}>
            {props.abortText ? props.abortText : "Abort"}
          </Button>
          <Button onClick={confirm} danger>
            {props.confirmText ? props.confirmText : "Confirm"}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
