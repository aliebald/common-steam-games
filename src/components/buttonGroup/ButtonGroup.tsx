import React from "react"
import Button from "../button/Button"
import "./buttonGroup.css"

export default function ButtonGroup(props: {
  name: string,
  options: string[],
  activeIndex: number,
  setActive: (index: number) => void,
  disabled?: boolean
}) {
  const getClass = (index: number) => {
    if (props.options.length === 1) {
      return "btn-group-btn";
    }
    if (index === props.options.length - 1) {
      return "btn-group-btn no-br-left";
    }
    if (index === 0) {
      return "btn-group-btn no-br-right";
    }
    return "btn-group-btn no-br"
  }

  return (
    <div className="btn-group">
      {props.options.map((option, index) => (
        <Button
          key={index}
          type="button"
          className={getClass(index)}
          appearance={index === props.activeIndex ? "confirm" : undefined}
          onClick={() => props.setActive(index)}
          disabled={props.disabled}
        >
          {option}
        </Button>
      ))}
    </div>
  )
}
