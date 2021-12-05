import React from "react";
import "./button.css";

export default function Button(props: {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  appearance?: "danger" | "confirm";
  title?: string;
  type?: "button" | "submit" | "reset";
  children?: JSX.Element | string;
  disabled?: boolean;
}) {
  return (
    <button
      className={`btn ${props.appearance ?? ""} ${props.className ?? ""}`}
      onClick={props.onClick}
      title={props.title}
      type={props.type}
      disabled={props.disabled}
    >
      {props.children ?? ""}
    </button>
  );
}
