import React from "react"
import Button from "../button/Button"
import SearchBar from "../searchBar/SearchBar";
import "./userHeader.css"

export default function UserHeader(props: {
  title: string,
  user: User,
  className?: string,
  onSearch?: (filter: string) => void,
  onSortByTotal?: () => void,
  onSortByLastTwoWeeks?: () => void
}) {
  const showSubheader = typeof props.onSearch !== "undefined"
    && typeof props.onSortByTotal !== "undefined"
    && typeof props.onSortByLastTwoWeeks !== "undefined";

  const handleSearchInput = (query: string) => {
    if (typeof props.onSearch !== "undefined") {
      props.onSearch(query);
    }
  }

  const subheader = (
    <div className="sub-header">
      <SearchBar
        placeholder="Search Game"
        onChange={handleSearchInput}
        title="Search for a game in your games"
      />
      <span title="Sorts your games according to your total playtime or playtime in the last two weeks">
        Sort&nbsp;by:
      </span>
      <Button onClick={props.onSortByLastTwoWeeks} title="Sorts your games according to your playtime in the last two weeks">
        Last&nbsp;2&nbsp;Weeks
      </Button>
      <Button onClick={props.onSortByTotal} title="Sorts your games according to your total playtime">
        Total
      </Button>
    </div>
  )

  return (
    <>
      <div className={`user-header ${showSubheader ? "has-subheader" : ""} ${props.className ?? ""}`}>
        <a href={props.user.profileurl} target="_blank" rel="noopener noreferrer" title="Steam profile">
          <img
            src={props.user.avatarmedium}
            width="45"
            height="45"
            alt="avatar"
          />
        </a>
        <div className="user-details">
          <h2>{props.title}</h2>
          {props.user.preferences ? <div>{props.user.preferences.length}&nbsp;Games</div> : ""}
        </div>
      </div>
      {showSubheader ? subheader : <></>}
    </>
  )
}
