import React, { useEffect, useState } from "react";
import "./EditProfile.css";
import { Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

function EditProfile() {
  const [currentUser, setCurrentUser] = useState();

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

  return (
    <div className="edit__profile">
      <Sidebar currentUser={currentUser} />
      <div className="profile__img">
        <h3>Profile Picture</h3>
        <div className="ppff__img">
          <Avatar className="edit__avatar" src={currentUser?.avatarImage} />
          <Link to="/myProfile">
            <button>Change Image</button>
          </Link>
          <h3>{currentUser?.username}</h3>
        </div>
      </div>

      <div className="acc__details">
        <h3>User Details</h3>
        <div className="acc__detailsform">
          <form className="detailsForm__profile">
            <h3 className="form__labelProfile">Username</h3>
            <input
              type="text"
              className="form__inputProfile"
              value={currentUser?.username}
            />
            <h3 className="form__labelProfile">Name</h3>
            <input type="text" className="form__inputProfile" value={""} />
            <h3 className="form__labelProfile">Organisation Name</h3>
            <input type="text" className="form__inputProfile" value={""} />
            <h3 className="form__labelProfile">Email address</h3>
            <input
              type="text"
              className="form__inputProfile"
              value={currentUser?.email}
            />
            <h3 className="form__labelProfile">Phone number</h3>
            <input type="text" className="form__inputProfile" value={""} />
            <button className="profile__submitBtn">EDIT DETAILS</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
