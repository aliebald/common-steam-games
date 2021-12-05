import React from "react";
import AddButton from "../addButton/AddButton";
import "./groupHeader.css";

export default function GroupHeader(props: {
  title: string;
  gamesCount: number;
  commonGames: boolean;
  addCustomGame: () => void;
  canAddCustomGames: boolean;
  className?: string;
}) {
  return (
    <div className={`group-header ${props.className ?? ""}`}>
      <div className="group-details">
        <h2>{props.title}</h2>
        <div>
          {props.gamesCount}&nbsp;{props.commonGames ? "Common Games" : "Games"}
        </div>
      </div>
      {props.canAddCustomGames ? <AddButton onClick={props.addCustomGame} title="Add Custom Games" /> : <></>}
    </div>
  );
}
