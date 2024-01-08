import React from "react";
import "./Message.css";

function Message({ message, sender, reff, id }) {
  return (
    <div ref={reff} key={id()} className={`message ${sender && "received"} `}>
      <p>{message.message}</p>
      <span>5:35 pm</span>
    </div>
  );
}

export default Message;
