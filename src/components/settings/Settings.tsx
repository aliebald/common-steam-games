import React from "react"
import ButtonGroup from "../buttonGroup/ButtonGroup";
import "./settings.css"

export default function Settings(props: {
  className?: string,
  isHost: boolean,
  settings: Settings,
  setSettings: (settings: Settings) => void
}) {
  function handleOnlyCommonGamesInput(index: number) {
    const newValue = index === 1;
    // Only update settings if value has changed
    if (props.settings.onlyCommonGames !== newValue) {
      const settings = { ...props.settings };
      settings.onlyCommonGames = newValue;
      props.setSettings(settings);
    }
  }

  function handleAllCanAddCustomGamesInput(index: number) {
    const newValue = index === 0;
    // Only update settings if value has changed
    if (props.settings.allCanAddCustomGames !== newValue) {
      const settings = { ...props.settings };
      settings.allCanAddCustomGames = newValue;
      props.setSettings(settings);
    }
  }

  function handleSortInput(index: number) {
    const newValue = index === 0 ? "total" : "last2Weeks";
    // Only update settings if value has changed
    if (props.settings.defaultSort !== newValue) {
      const settings = { ...props.settings };
      settings.defaultSort = newValue;
      props.setSettings(settings);
    }
  }

  return (
    <div className={props.className}>
      <div className="settings-section">
        <label className="settings-label">What games should be matched:</label>
        <ButtonGroup
          name="CGOptions"
          options={["All Games", "Only Common Games"]}
          activeIndex={props.settings.onlyCommonGames ? 1 : 0}
          setActive={handleOnlyCommonGamesInput}
        />
      </div>
      <div className="settings-section">
        <label className="settings-label">Who can add custom games:</label>
        <ButtonGroup
          name="CGOptions"
          options={["Everyone", "Only Host"]}
          activeIndex={props.settings.allCanAddCustomGames ? 0 : 1}
          setActive={handleAllCanAddCustomGamesInput}
          disabled={!props.isHost}
        />
      </div>
      <div className="settings-section">
        <label className="settings-label">Default game sort for new users:</label>
        <ButtonGroup
          name="CGOptions"
          options={["Total Playtime", "Playtime Last 2 Weeks"]}
          activeIndex={props.settings.defaultSort === "total" ? 0 : 1}
          setActive={(index) => handleSortInput(index)}
          disabled={!props.isHost}
        />
      </div>
    </div>
  )
}
