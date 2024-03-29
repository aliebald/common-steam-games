import React from "react";
import Tooltip from "../tooltip/Tooltip";
import UserCard from "../userCard/UserCard";
import { convertWeightToPercentage, getImage, getStorePage } from "./util";
import "./game.css";

export default function Game(props: {
  game: Game | MatchedGame;
  showOwners?: boolean;
  isDnD?: boolean;
  DnDHighlight?: boolean; // Increases brightness of dnd icon for a few seconds after first render
}) {
  const playtime = Math.round((props.game.playtime_forever / 60 + Number.EPSILON) * 100) / 100;
  const playtime2weeks = props.game.playtime_2weeks
    ? Math.round((props.game.playtime_2weeks / 60 + Number.EPSILON) * 100) / 100
    : 0;
  const isMatchedGame = "weight" in (props.game as MatchedGame);
  const isCustom = props.game.isCustom ?? false;

  let playtimeText: string;
  const weightPercentage = isMatchedGame ? convertWeightToPercentage((props.game as MatchedGame).weight) : "";
  if (isCustom) {
    playtimeText = "Custom Game";
  } else if (isMatchedGame) {
    playtimeText = `Average Playtime: ${playtime}h`;
  } else {
    playtimeText = playtime2weeks > 0 ? `Playtime: ${playtime}h / ${playtime2weeks}h` : `Playtime: ${playtime}h`;
  }

  let icon: JSX.Element;
  const hasImage = props.game.img_icon_url.length > 0;
  if (hasImage) {
    icon = (
      <img src={getImage(props.game.appid, props.game.img_icon_url)} width="32" height="32" alt="icon" loading="lazy" />
    );
  } else {
    const char = props.game.name.length > 0 ? props.game.name.charAt(0) : "?";
    icon = (
      <div className={`no-icon${isCustom ? " custom" : ""}`}>
        <span>{char}</span>
      </div>
    );
  }

  const optionalAProps = props.isDnD ? { tabIndex: -1 } : {};
  const storePageLink = getStorePage(props.game.appid);

  return (
    <div className="game">
      {!isCustom && storePageLink ? (
        <a
          className="img-link"
          href={storePageLink}
          title={`${props.game.name} steam page`}
          target="_blank"
          rel="noopener noreferrer"
          style={hasImage ? {} : { textDecoration: "none" }}
          {...optionalAProps}
        >
          {icon}
        </a>
      ) : (
        <div className="img-link no-select">{icon}</div>
      )}
      <div className={isMatchedGame || props.isDnD ? "game-info no-br" : "game-info"}>
        <div className="title">{props.game.name}</div>
        <div className="playtime">{playtimeText}</div>
      </div>
      {isMatchedGame ? (
        <div className="match-info">
          {props.showOwners ? (
            <Owners owners={(props.game as MatchedGame).owners} gameTitle={props.game.name} />
          ) : (
            <></>
          )}
          <div className="weight">Match:&nbsp;{weightPercentage}</div>
        </div>
      ) : (
        <></>
      )}
      {props.isDnD ? (
        <div className="dnd-icon">
          <img src="/dnd_icon.svg" alt="dnd" width="17" height="32" className={props.DnDHighlight ? "highlight" : ""} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

function Owners(props: { owners: User[]; gameTitle: string }) {
  return (
    <>
      {props.owners.map((owner, index) => (
        <Tooltip position="bottom-left" tooltip={<UserCard user={owner} />} key={index}>
          <img src={owner.avatar} alt="" height="16px" width="16px" className="owner" loading="lazy" />
        </Tooltip>
      ))}
    </>
  );
}
