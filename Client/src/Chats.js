import React from "react";
import "./Chats.css";
import { Avatar } from "@mui/material";

function Chats({ friend, selected, changeChh, index }) {
  return (
    <div
      className={`chats ${selected && "chats__selected"}`}
      onClick={() => changeChh(index, friend)}
    >
      <div className="chat__info">
        <Avatar src={friend.avatarImage} className="chat__ava" />
        <h3>{friend.username}</h3>
      </div>
    </div>
  );
}

export default Chats;
