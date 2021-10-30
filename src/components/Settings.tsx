import React from "react"
import Switch from "./Switch"
import "../styles/settings.css"

export default function Settings(props: {
  settings: Settings,
  setSettings: (settings: Settings) => void
}) {
  const setOnlyCommonGames = (onlyCommonGames: boolean) => {
    const settings = { ...props.settings };
    settings.onlyCommonGames = onlyCommonGames;
    props.setSettings(settings);
  }

  return (
    <div className="settings">
      <label>Only&nbsp;Common&nbsp;Games
        <Switch className="padding-switch" onChange={setOnlyCommonGames} defaultChecked={props.settings.onlyCommonGames} />
      </label>
    </div>
  )
}
