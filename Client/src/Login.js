import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { loginRoute } from "./axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { data } = await axios.post(loginRoute, {
        username,
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
    if (username === "") {
      toast.error("Username is required", {
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
            <h2>Log in</h2>
            <form onSubmit={handleSubmit}>
              <h3>Username</h3>
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
                placeholder="Enter your Username"
              />
              <h3>Password</h3>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Enter your Password"
              />
              <p>forgot password?</p>
              <button type="submit">Login</button>
            </form>
            <p className="alr_acc">
              Don't have an account? <Link to={"/signup"}>Register Here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
