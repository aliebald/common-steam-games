import React from "react"
import "../styles/switch.css"

export default function Switch(props: {
  onChange: (onlyCommonGames: boolean) => void,
  defaultChecked?: boolean,
  className?: string
}) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.checked);
  }

  const content = (
    <div className="switch">
      <input type="checkbox" onChange={handleChange} defaultChecked={props.defaultChecked} />
      <span className="slider"></span>
    </div>
  )

  if (props.className) {
    return <div className={props.className}>{content}</div>;
  }
  return content;
}
