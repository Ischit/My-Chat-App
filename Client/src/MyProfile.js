import React, { useEffect, useState } from "react";
import "./MyProfile.css";
import { Link, useNavigate } from "react-router-dom";
import { setAvatarRoute } from "./axios";
import { toast } from "react-toastify";
import axios from "axios";
import { ExitToApp } from "@mui/icons-material";

function MyProfile() {
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  useEffect(() => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    }
  }, []);

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

  const avatarLoad = () => {
    try {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const newSeed = Math.floor(Math.random() * 5000);
        const image = `https://api.dicebear.com/7.x/adventurer/svg?seed=${newSeed}`;
        data.push(image);
      }
      setAvatars(data);
    } catch (error) {
      console.error("Error generating avatars ", error);
    }
  };
  useEffect(() => {
    avatarLoad();
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar");
    } else {
      const { data } = await axios.post(
        `${setAvatarRoute}/${currentUser._id}`,
        {
          image: avatars[selectedAvatar],
        }
      );

      if (data.isSet) {
        currentUser.isAvatarSet = true;
        currentUser.avatarImage = avatars[selectedAvatar];
        localStorage.setItem("chat-app-user", JSON.stringify(currentUser));
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again", {
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: "dark",
        });
      }
    }
  };

  return (
    <div className="myProfile">
      <div className="profile__box">
        <div className="title__container">
          <Link to="/">
            <ExitToApp />
          </Link>
          <h1>Pick an avatar as your profile picture</h1>
        </div>
        <div className="avatars">
          {avatars.map((avatar, index) => {
            return (
              <div
                key={index}
                className={`avatar ${
                  selectedAvatar === index ? "selectedAv" : ""
                }`}
              >
                <img
                  src={avatar}
                  alt="avatar"
                  onClick={() => setSelectedAvatar(index)}
                />
              </div>
            );
          })}
        </div>
        <button onClick={setProfilePicture} className="submit__btnAvatars">
          Set as Profile Picture
        </button>
      </div>
    </div>
  );
}

export default MyProfile;
