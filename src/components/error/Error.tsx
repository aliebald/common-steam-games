import React, { useEffect } from 'react'
import "./error.css"

export default function Error(props: {
  error: ErrorType
  removeError: () => void
}) {
  useEffect(() => {
    const timeout = props.error.timeout;
    let timer: NodeJS.Timeout | undefined;
    if (timeout) {
      timer = setTimeout(() => {
        props.removeError();
      }, timeout);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [props]);

  return (
    <div className="error-popup">
      {props.error.msg}
      <div className="error-close" onClick={props.removeError}></div>
    </div>
  )
}
