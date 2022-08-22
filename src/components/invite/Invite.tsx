import React from "react";
import Button from "../button/Button";
import "./invite.css";

export default function Invite(props: { sessionId: string; className?: string; openFriendsList: () => void }) {
  const invite = `${window.location.origin}/join?sessionId=${encodeURIComponent(props.sessionId)}`;
  const copyInvite = () => {
    navigator.clipboard.writeText(invite);
  };
  const handleFocus = (event: any) => {
    event.target.select();
  };

  return (
    <div className={`invite-box ${props.className ?? ""}`}>
      <label>Invite your friends</label>
      <div className="invite-row">
        <input
          className="invite-input"
          type="text"
          value={invite}
          readOnly
          onFocus={handleFocus}
          title="Invite link. Click 'Copy Invite' to copy this link"
        />
        <Button onClick={copyInvite} title="Copy invite link">
          Copy&nbsp;Invite
        </Button>
        <Button
          onClick={props.openFriendsList}
          title={
            "Open your friends list and create personalized invites. " +
            "This allows your friends to directly join you without looking up their steamId."
          }
        >
          Open&nbsp;Friends&nbsp;List
        </Button>
      </div>
    </div>
  );
}
