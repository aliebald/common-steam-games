import React from 'react'
import Error from "./Error"
import "../styles/error.css"

export default function ErrorList(props: {
  errors: ErrorType[],
  setErrors: (err: ErrorType[]) => void
}) {
  const getRemoveErrorFnc = (error: ErrorType) => {
    return () => props.setErrors(props.errors.filter(err => err !== error));
  }

  console.log(props.errors);

  return (
    <div className="error-popup-list">
      <div>
        {props.errors.map(error => <Error removeError={getRemoveErrorFnc(error)} error={error} />)}
      </div>
    </div>
  )
}
