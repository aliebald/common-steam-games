import React, { useEffect, useState } from "react"
import { Socket } from "socket.io-client";
import Friend from "./Friend";
import Loading from "./Loading";
import { compareTwoStrings } from "string-similarity";
import "../styles/friendslist.css"
import Button from "./Button";

export default function FriendsList(props: {
  socket: Socket,
  sessionId: string,
  closeFriendsList: () => void;
}) {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [list, setList] = useState<JSX.Element[]>([]);

  useEffect(() => {
    // set listener and request data
    props.socket.on("friendsList", (msg: any) => {
      console.log("friendsList", msg);
      setFriends(msg as Friend[]);
    });
    props.socket.emit("getFriendsList");

    return () => {
      props.socket.removeAllListeners("friendslist");
    }
  }, [props.socket])

  // Updates Friendslist when friends are loaded or the search is used
  useEffect(() => {
    const addSimilarity = (friend: Friend): Friend => {
      let similarity = compareTwoStrings(friend.personaname, filter);
      if (friend.realname) {
        similarity += compareTwoStrings(friend.realname, filter);
        similarity /= 2;
      }
      return { ...friend, filterSimilarity: similarity };
    }

    const sortBySimilarity = (a: Friend, b: Friend) => {
      if (a.filterSimilarity === undefined || b.filterSimilarity === undefined) {
        console.warn("filterSimilarity is not defined");
        return 0;
      }
      return b.filterSimilarity - a.filterSimilarity;
    }

    const mapToJSXElement = (friend: Friend) => (
      <Friend friend={friend} key={friend.steamId} sessionId={props.sessionId} />
    );

    if (filter.length < 2) {
      setList(friends.map(mapToJSXElement));
    } else {
      // Apply filter
      setList(friends.map(addSimilarity).sort(sortBySimilarity).map(mapToJSXElement));
    }
  }, [filter, friends, props.sessionId])

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  }

  return (
    <div className="friendslist">
      <div className="blur-bg" onClick={props.closeFriendsList}></div>
      <div className="friends">
        <div className="friendslist-header">
          <input className="friend-search" type="text" onChange={handleFilterChange} placeholder="Search Friends" />
          <Button onClick={props.closeFriendsList} danger>&nbsp;Close&nbsp;Friends&nbsp;</Button>
        </div>
        <div className="list">
          {friends.length === 0 ? <Loading center /> : list}
        </div>
      </div>
    </div>
  )
}
