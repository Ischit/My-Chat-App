import React, { useEffect, useRef, useState } from "react";
import "./MainPage.css";
import Sidebar from "./Sidebar";
import ChatsPage from "./ChatsPage";
import ChatPage from "./ChatPage";
import { useNavigate } from "react-router-dom";
import { host } from "./axios";
import { io } from "socket.io-client";

function MainPage() {
  const socket = useRef();
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [lastMessage, setLastMessage] = useState("");

  const navigate = useNavigate();

  const getUser = async () => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div className="mainPage">
      <Sidebar currentUser={currentUser} />
      <ChatsPage currentUser={currentUser} changeChat={handleChatChange} />
      <ChatPage
        currentChat={currentChat}
        currentUser={currentUser}
        socket={socket}
        setLastMessage={setLastMessage}
      />
    </div>
  );
}

export default MainPage;
