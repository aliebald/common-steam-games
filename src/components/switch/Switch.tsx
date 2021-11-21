import React from "react"
import "./switch.css"

export default function Switch(props: {
  onChange: (onlyCommonGames: boolean) => void,
  checked?: boolean,
  className?: string
}) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.checked);
  }

  const content = (
    <div className="switch">
      <input type="checkbox" onChange={handleChange} checked={props.checked} />
      <span className="slider"></span>
    </div>
  )

  if (props.className) {
    return <div className={props.className}>{content}</div>;
  }
  return content;
}
