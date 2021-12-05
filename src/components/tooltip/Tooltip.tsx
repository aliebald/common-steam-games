import React, { useState } from "react";
import "./tooltip.css";

export default function Tooltip(props: {
  children: JSX.Element;
  tooltip: JSX.Element;
  position: "bottom" | "right" | "left" | "bottom-left";
}) {
  const [show, setShow] = useState(false);

  if (!show) {
    return (
      <div onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
        {props.children}
      </div>
    );
  }

  return (
    <div className="tooltip-wrapper" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <div className={`tooltip-popup ${props.position}`}>{props.tooltip}</div>
      {props.children}
    </div>
  );
}
