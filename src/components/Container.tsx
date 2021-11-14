import React from "react"
import { useMediaQuery } from "react-responsive"
import Tabs from "./Tabs";
import "./../styles/container.css"

export default function Container(props: {
  children: JSX.Element[]
  titles: string[]
}) {
  const isDesktop = useMediaQuery({ query: '(min-width: 1100px)' });

  if (!isDesktop) {
    return (
      <Tabs titles={props.titles} className="container-tabs">
        {props.children}
      </Tabs>
    );
  }

  return (
    <div className="container">
      {props.children}
    </div>
  );
}
