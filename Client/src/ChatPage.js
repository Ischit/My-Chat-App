import React, { useEffect, useRef, useState } from "react";
import "./ChatPage.css";
import {
  AttachFile,
  Call,
  Mic,
  MoreHoriz,
  Videocam,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import Message from "./Message";
import axios from "axios";
import { gettAllMessagesRoute, sendMessageRoute } from "./axios";
import { v4 as uuidv4 } from "uuid";

function ChatPage({ currentChat, currentUser, socket, setLastMessage }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.length > 0) {
      await axios.post(sendMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
        message: input,
      });
      socket.current.emit("send-msg", {
        to: currentChat._id,
        from: currentUser._id,
        message: input,
      });

      const msgs = [...messages];
      msgs.push({ fromSelf: true, message: input });
      setMessages(msgs);

      setInput("");
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (mess) => {
        setArrivalMessage({ fromSelf: false, message: mess });
      });
    }
  }, [socket.current]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  const getmsgg = async () => {
    const response = await axios.post(gettAllMessagesRoute, {
      from: currentUser?._id,
      to: currentChat?._id,
    });
    setMessages(response.data.projectedMessages);
  };

  useEffect(() => {
    getmsgg();
  }, [currentChat]);

  useEffect(() => {
    setLastMessage(messages[messages.length - 1]);
  }, [messages]);

  return (
    <>
      {currentChat ? (
        <div className="chatPage">
          <div className="chatHeader">
            <Avatar
              style={{ cursor: "pointer" }}
              className="ava__chat"
              src={currentChat?.avatarImage}
            />
            <h2>{currentChat?.username}</h2>
            <Call className="icoi" />
            <Videocam className="icoi" />
            <MoreHoriz className="icoi" />
          </div>

          <div className="chatArea">
            {messages.length > 0 &&
              messages.map((message) => {
                return (
                  <Message
                    id={uuidv4}
                    reff={scrollRef}
                    message={message}
                    sender={message.fromSelf ? true : false}
                  />
                );
              })}
          </div>

          <div className="chat__footer">
            <AttachFile className="icoiii" />
            <input
              className="chat__input"
              type="text"
              placeholder="Type a message here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Mic className="icoiii" />
            <img
              src="https://cdn-icons-png.flaticon.com/512/7973/7973147.png"
              alt=""
              onClick={handleSubmit}
              className="icoiii send"
            />
          </div>
        </div>
      ) : (
        <div className="chatPageAlt">
          <img
            className="immmggg"
            src="https://cdn-icons-png.flaticon.com/512/8275/8275427.png"
            alt="logo"
          />
          <h1>Welcome {currentUser?.username},</h1>
          <p>Please click on a chat to Start Messaging</p>
        </div>
      )}
    </>
  );
}

export default ChatPage;
