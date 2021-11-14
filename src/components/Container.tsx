import React from "react"
import { useMediaQuery } from "react-responsive"
import Tabs from "./Tabs";
import "./../styles/container.css"

export default function Container(props: {
  children: JSX.Element[],
  titles: string[],
  minTitles: string[]
}) {
  const isDesktop = useMediaQuery({ query: '(min-width: 1100px)' });
  const showMinTitles = useMediaQuery({ query: '(max-width: 450px)' });
  const titles = showMinTitles ? props.minTitles : props.titles;

  if (!isDesktop) {
    return (
      <Tabs titles={titles} className="container-tabs">
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
