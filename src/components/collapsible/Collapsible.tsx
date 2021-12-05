import React, { useState } from "react";
import "./collapsible.css";

export default function Collapsible(props: {
  header?: string | JSX.Element;
  title?: string;
  btnClassName?: string;
  children: JSX.Element;
}) {
  const [collapsed, setCollapsed] = useState(true);
  const [hideContent, setHideContent] = useState(true);
  const [lastTimeout, setLastTimeout] = useState<NodeJS.Timeout | undefined>(undefined);

  /* This component uses css transition to animate opening and closing.
   * To remove the content after closing, we need to wait until the transition is finished.
   * This is handled by "toggle"
   */
  const toggle = () => {
    // Abort last timeout to avoid setting hideContent true,
    // if the content was collapsed and opened again immediately
    if (lastTimeout) {
      clearTimeout(lastTimeout);
      setLastTimeout(undefined);
    }

    // Toggle collapsed state. Hide content after animation delay
    if (collapsed) {
      setHideContent(false);
    } else {
      const timeout = setTimeout(() => setHideContent(true), 500);
      setLastTimeout(timeout);
    }
    setCollapsed(!collapsed);
  };

  return (
    <>
      <button
        type="button"
        className={`collapsible${hideContent ? " collapsed" : ""} ${props.btnClassName}`}
        onClick={toggle}
        title={props.title}
      >
        {props.header ?? "Open"}
        <div className={collapsed ? "arrow-down" : "arrow-up"}>
          <div className="arrow-l"></div>
          <div className="arrow-r"></div>
        </div>
      </button>
      <div className={`content ${collapsed ? "content-collapsed" : ""}`}>{hideContent ? <></> : props.children}</div>
    </>
  );
}
