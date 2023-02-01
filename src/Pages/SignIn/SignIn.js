import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import "./SignIn.css";
import { getCurrentUser, logIn } from "../../API/API";

export default function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogIn() {
    try {
      await logIn(username, password);
      if (getCurrentUser() !== null) {
        setUsername("");
        setPassword("");
        navigate("/home");
      } else {
        navigate("/");
      }
    } catch (error) {
      alert(`Error while logging in! ${error.message}`);
    }
  }

  const goToPasswordRequest = () => {
    navigate("passwordReset");
  };

  return (
    <div>
      <div className="sign-in-page">
        <img
          className="header-logo"
          src="./Icons/welcome-cat.png"
          alt="cat mascot"
        />
        <h1 className="header-welcome">WELCOME</h1>

        <div className="sign-in-box">
          <form className="inputs">
            <div className="input-container">
              <input
                className="input-field"
                type="text"
                name="uname"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Username"
                required
              />
            </div>
            <div className="input-container">
              <input
                className="input-field"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                name="pass"
                placeholder="Password"
                required
              />
            </div>
          </form>
          <div className="forgot-pass" onClick={goToPasswordRequest}>
            Forgot password?
          </div>
          <button onClick={handleLogIn}>Log in</button>
          <Link to="signUp">
            <button>Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
