import React, { useState } from 'react'

export default function Collapsible(props: {
  header?: string | JSX.Element,
  children?: JSX.Element
}) {
  const [collapsed, setCollapsed] = useState(true);
  const [hideContent, setHideContent] = useState(true);
  const [lastTimeout, setLastTimeout] = useState<NodeJS.Timeout | undefined>(undefined);

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
  }

  const content = props.children ?? "No Content";
  return (
    <>
      <button type="button" className="collapsible" onClick={toggle}>
        {props.header ?? "Open"}
        <i className={collapsed ? "arrow-down" : "arrow-up"}></i>
      </button>
      <div className={`content ${collapsed ? "content-collapsed" : ""}`}>
        {hideContent ? <></> : content}
      </div>
    </>
  )
}
