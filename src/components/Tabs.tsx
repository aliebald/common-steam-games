import React, { useState } from "react"
import Button from "./Button";
import "./../styles/tabs.css"

export default function Tabs(props: {
  children: JSX.Element[],
  titles: string[],
  className?: string
}) {
  const [activeChild, setActiveChild] = useState(0);

  return (
    <div className={props.className}>
      <ul className="tabs">
        {props.titles.map((title, index) => (
          <li key={index}
            className={`tabs-item ${activeChild === index ? " active" : ""}`}
          >
            <Button onClick={() => setActiveChild(index)}>
              {title}
            </Button>
          </li>
        ))}
      </ul>
      {props.children[activeChild]}
    </div >
  )
}
