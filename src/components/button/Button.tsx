import React from "react";
import "./button.css";

export default function Button(props: {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  appearance?: "default" | "danger" | "confirm" | "outline";
  title?: string;
  type?: "button" | "submit" | "reset";
  children?: JSX.Element | string;
  disabled?: boolean;
}) {
  return (
    <button
      className={`btn ${props.appearance ?? "default"} ${props.className ?? ""}`}
      onClick={props.onClick}
      title={props.title}
      type={props.type}
      disabled={props.disabled}
    >
      {props.children ?? ""}
    </button>
  );
}
