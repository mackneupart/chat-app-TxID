import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import "./SignIn.css";
import { getCurrentUser, logIn } from "../../API/API";
import { refreshSessionToken } from "../../API/API";

export default function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let tokenRefreshTimer;

  function startTokenRefreshTimer() {
    const currentUser = getCurrentUser();
    const expiresInMs = currentUser.getSessionToken();
    const refreshTimeMs = expiresInMs - 10 * 60 * 1000; // Refresh token 10 minutes before it expires
    tokenRefreshTimer = setTimeout(async () => {
      await refreshSessionToken();
      startTokenRefreshTimer();
    }, refreshTimeMs);
  }

  function stopTokenRefreshTimer() {
    clearTimeout(tokenRefreshTimer);
  }

  async function handleLogIn(event) {
    event.preventDefault();
    try {
      await logIn(username, password);
      if (getCurrentUser() !== null) {
        setUsername("");
        setPassword("");
        startTokenRefreshTimer();
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

  const goToSignup = () => {
    navigate("signup");
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-sm-8 col-md-6 col-lg-4">
            <h1 className="text-center">WELCOME</h1>
            <h6 className="text-center">TO CHIT CHAT</h6>
            <form onSubmit={handleLogIn}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              <div className="text-right mb-3 forgot-pass">
                <a href="#" onClick={goToPasswordRequest}>
                  Forgot password?
                </a>
              </div>
              <div className="text-center">
                <Button
                  type="submit"
                  className="btn btn-primary"
                  text="LOGIN"
                />

                <Button
                  type="button"
                  className="btn btn-link"
                  click={goToSignup}
                  text="SIGNUP"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
