import React from "react";
import { useMediaQuery } from "react-responsive";
import Tabs from "../tabs/Tabs";
import "./container.css";

export default function Container(props: {
  children: JSX.Element[] | JSX.Element;
  className?: string;
  titles?: string[];
  minTitles?: string[];
}) {
  // Container for Matching page
  if (props.titles && props.minTitles) {
    return (
      <MatchingContainer titles={props.titles} minTitles={props.minTitles}>
        {props.children as JSX.Element[]}
      </MatchingContainer>
    );
  }

  // Simple - single column - container
  return (
    <div className="container-single">
      <div className={`container-single-inner ${props.className ?? ""}`}>{props.children}</div>
    </div>
  );
}

function MatchingContainer(props: {
  children: JSX.Element[];
  className?: string;
  titles: string[];
  minTitles: string[];
}) {
  const isDesktop = useMediaQuery({ query: "(min-width: 1100px)" });
  const showMinTitles = useMediaQuery({ query: "(max-width: 450px)" });
  const titles = showMinTitles ? props.minTitles : props.titles;

  // Desktop version with 3 tabs used by Matching
  if (isDesktop) {
    return <div className={`container ${props.className ?? ""}`}>{props.children}</div>;
  }

  // Mobile version
  return (
    <Tabs titles={titles} className={`container-tabs ${props.className ?? ""}`}>
      {props.children}
    </Tabs>
  );
}
