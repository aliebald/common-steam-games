import React from 'react'
import '../styles/game.css'


export default function Game(props: { game: Game | MatchedGame }) {
  const playtime = Math.round(((props.game.playtime_forever / 60) + Number.EPSILON) * 100) / 100
  const playtime2weeks = props.game.playtime_2weeks ? Math.round(((props.game.playtime_2weeks / 60) + Number.EPSILON) * 100) / 100 : 0

  let playtimeText: string;
  if ((props.game as MatchedGame).weight) {
    playtimeText = `Average Playtime ${playtime}h - w: ${(props.game as MatchedGame).weight}`;
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
      <div className="game-info">
        <div className="title">{props.game.name}</div>
        <div className="playtime">{playtimeText}</div>
      </div>
    </div>
  )
}

function getImage(appid: number | string, hash: number | string): string {
  return `https://media.steampowered.com/steamcommunity/public/images/apps/${appid}/${hash}.jpg`
}

function getStorePage(appid: number | string): string {
  return `https://store.steampowered.com/app/${appid}`
}
