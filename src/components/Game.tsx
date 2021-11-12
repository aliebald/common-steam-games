import React from 'react'
import Tooltip from './Tooltip'
import UserCard from './UserCard'
import '../styles/game.css'


export default function Game(props: {
  game: Game | MatchedGame,
  showOwners?: boolean,
  isDnD?: boolean,
  DnDHighlight?: boolean // Increases brightness of dnd icon for a few seconds after first render
}) {
  const playtime = Math.round(((props.game.playtime_forever / 60) + Number.EPSILON) * 100) / 100
  const playtime2weeks = props.game.playtime_2weeks ? Math.round(((props.game.playtime_2weeks / 60) + Number.EPSILON) * 100) / 100 : 0
  const isMatchedGame = "weight" in (props.game as MatchedGame)

  let playtimeText: string;
  let weightPercentage = "";
  if (isMatchedGame) {
    weightPercentage = convertWeightToPercentage((props.game as MatchedGame).weight);
    playtimeText = `Average Playtime: ${playtime}h`;
  } else {
    playtimeText = playtime2weeks > 0 ? `Playtime: ${playtime}h / ${playtime2weeks}h` : `Playtime: ${playtime}h`
  }

  let icon: JSX.Element;
  const hasImage = props.game.img_icon_url.length > 0
  if (hasImage) {
    icon = <img
      src={getImage(props.game.appid, props.game.img_icon_url)}
      width="32"
      height="32"
      alt="icon"
      loading="lazy"
    />
  } else {
    icon = <div className="no-icon"><span>?</span></div>
  }

  return (
    <div className="game">
      <a
        className="img-link"
        href={getStorePage(props.game.appid)}
        title={`${props.game.name} steam page`}
        target="_blank"
        rel="noopener noreferrer"
        style={hasImage ? {} : { textDecoration: "none" }}
      >
        {icon}
      </a>
      <div className={isMatchedGame || props.isDnD ? "game-info no-br" : "game-info"}>
        <div className="title">{props.game.name}</div>
        <div className="playtime">{playtimeText}</div>
      </div>
      {isMatchedGame ?
        <div className="match-info">
          {props.showOwners ? <Owners owners={(props.game as MatchedGame).owners} gameTitle={props.game.name} /> : <></>}
          <div className="weight">Match:&nbsp;{weightPercentage}</div>
        </div>
        : <></>}
      {props.isDnD ? <div className="dnd-icon">
        <img src="dnd_icon.svg" alt="" width="17" height="32" className={props.DnDHighlight ? "highlight" : ""} />
      </div> : <></>}
    </div>
  )
}

function Owners(props: { owners: User[], gameTitle: string }) {
  return (
    <>
      {props.owners.map((owner, index) =>
        <Tooltip position="bottom-left" tooltip={<UserCard user={owner} />} key={index}>
          <img
            src={owner.avatar}
            alt=""
            height="16px"
            width="16px"
            className="owner"
            loading="lazy"
          />
        </Tooltip>
      )}
    </>
  );
}

function getImage(appid: number | string, hash: number | string): string {
  return `https://media.steampowered.com/steamcommunity/public/images/apps/${appid}/${hash}.jpg`;
}

function getStorePage(appid: number | string): string {
  return `https://store.steampowered.com/app/${appid}`;
}

function convertWeightToPercentage(weight: number): string {
  // Get weight as rounded percentage with 2 trailing decimals
  const num = (Math.round(weight * 10000) / 100).toFixed(2);
  // remove trailing zeros using parseFloat
  return `${parseFloat(num)}%`;
}
