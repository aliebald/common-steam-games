import React from 'react'
import '../styles/game.css'


export default function Game(props: { game: Game | MatchedGame, showOwners?: boolean }) {
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
  return (
    <div className="game">
      <a href={getStorePage(props.game.appid)} target="_blank" rel="noopener noreferrer" title={`${props.game.name} steam page`}>
        <img
          src={getImage(props.game.appid, props.game.img_icon_url)}
          width="32"
          height="32"
          alt="icon"
          loading="lazy"
        />
      </a>
      <div className={isMatchedGame ? "game-info no-br" : "game-info"}>
        <div className="title">{props.game.name}</div>
        <div className="playtime">{playtimeText}</div>
      </div>
      {isMatchedGame ?
        <div className="match-info">
          {props.showOwners ? <Owners owners={(props.game as MatchedGame).owners} gameTitle={props.game.name} /> : <></>}
          <div className="weight">Match:&nbsp;{weightPercentage}</div>
        </div>
        : <></>}
    </div>
  )
}

function Owners(props: { owners: User[], gameTitle: string }) {
  return (
    <>
      {props.owners.map((owner, index) =>
        <img
          src={owner.avatar}
          key={index}
          alt=""
          height="16px"
          width="16px"
          className="owner"
          title={`${owner.personaname ?? owner.realname} owns ${props.gameTitle}`}
          loading="lazy"
        />
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
