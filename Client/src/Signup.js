import React, { useEffect, useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "./axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (handleValidation()) {
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, {
          position: toast.POSITION.BOTTOM_RIGHT,
          theme: "dark",
        });
      }
      if (data.status === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/", { replace: true });
      }
    }
  };

  const handleValidation = () => {
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same.", {
        position: toast.POSITION.BOTTOM_RIGHT,
        theme: "dark",
      });
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be grater than 3 characters", {
        position: toast.POSITION.BOTTOM_RIGHT,
        theme: "dark",
      });
      return false;
    } else if (password.length < 6) {
      toast.error("Password should be grater than 6 characters", {
        position: toast.POSITION.BOTTOM_RIGHT,
        theme: "dark",
      });
      return false;
    } else if (email === "") {
      toast.error("Email is required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        theme: "dark",
      });
      return false;
    } else if (password === "") {
      toast.error("Password is required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        theme: "dark",
      });
      return false;
    } else if (username === "") {
      toast.error("Uername is required", {
        position: toast.POSITION.BOTTOM_RIGHT,
        theme: "dark",
      });
      return false;
    }
    return true;
  };

  return (
    <div className="login">
      <div className="login__box">
        <div className="login__boxLeft">
          <img
            src="https://cdn-icons-png.flaticon.com/512/8275/8275427.png"
            alt="logo"
          />
        </div>
        <div className="login__boxRight">
          <div className="form__main">
            <h2>Sign up</h2>
            <form onSubmit={handleSubmit}>
              <h3>Username</h3>
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
                placeholder="Enter your Username"
              />
              <h3>Email</h3>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder="Enter your Email"
              />
              <h3>Password</h3>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Enter your Password"
              />
              <h3>Confirm Password</h3>
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                type="password"
                placeholder="Enter your Password"
              />
              <button type="submit">Signup</button>
            </form>
            <Link to={"/login"}>
              <p className="alr_acc">Already have an account?</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
