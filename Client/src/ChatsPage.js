import React, { useEffect, useState } from "react";
import "./ChatsPage.css";
import { Search } from "@mui/icons-material";
import Chats from "./Chats";
import { allUsersRoute } from "./axios";
import axios from "axios";

function ChatsPage({ changeChat, currentUser }) {
  const [contacts, setContacts] = useState([]);
  const [currentSelected, setCurrentSelected] = useState(null);

  const getChats = async () => {
    if (currentUser) {
      const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
      setContacts(data.data);
    }
  };

  useEffect(() => {
    getChats();
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <div className="chatsPage">
      <div className="chat__search">
        <div className="search">
          <Search className="search__ico" />
          <input
            className="search__input"
            type="text"
            placeholder="Enter for search..."
          />
        </div>
      </div>

      <div className="chatsPagelist">
        {contacts.map((contact, index) => (
          <Chats
            selected={index === currentSelected ? true : false}
            friend={contact}
            changeChh={changeCurrentChat}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

export default ChatsPage;
