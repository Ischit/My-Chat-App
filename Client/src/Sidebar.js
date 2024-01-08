import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
  Chat,
  Groups,
  Home,
  Logout,
  MoreHoriz,
  Notifications,
  Settings,
} from "@mui/icons-material";

function Sidebar({ currentUser }) {
  const navigate = useNavigate();
  const [image, setImage] = useState("");

  var x = document.getElementsByClassName("sidebar__ico");
  for (var i = 0; i < x.length; i++) {
    x[i].addEventListener(
      "click",
      function () {
        var selectedEl = document.querySelector(".selected");
        if (selectedEl) {
          selectedEl.classList.remove("selected");
        }
        this.classList.add("selected");
      },
      false
    );
  }

  const logout = () => {
    localStorage.removeItem("chat-app-user");
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    if (currentUser) {
      setImage(currentUser.avatarImage);
    }
  }, [currentUser]);

  return (
    <div className="sidebar">
      <Link to="/editProfile">
        <Avatar
          src={image}
          className="sidebar__avatar"
          style={{ width: "90px", height: "90px" }}
        />
      </Link>
      <Home className="sidebar__ico" />
      <Link to="/">
        <Chat className="sidebar__ico" />
      </Link>
      <Groups className="sidebar__ico" />
      <Notifications className="sidebar__ico" />
      <MoreHoriz className="sidebar__ico" />
      <Settings className="sidebar__ico" />
      <Logout onClick={logout} className="sidebar__ico" />
    </div>
  );
}

export default Sidebar;
