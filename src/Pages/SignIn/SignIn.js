import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import "./signIn.css";
import "../../DesignSystem/grid.css";
import { logIn } from "../../API/API";

function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = async () => {
    try {
      await logIn(username, password);
      // Clear input fields
      setUsername("");
      setPassword("");
      navigate("/home");
    } catch (error) {
      alert(`Error! ${error.message}`);
    }
  };

  const goToPasswordRequest = () => {
    navigate("passwordReset");
  };

  return (
    <div>
      <div className="sign-in-page">
        <div className="sign-in-box purple-box">
          <img
            className="header-logo"
            src="./Icons/welcome-cat.png"
            alt="cat mascot"
          />
          <h1 className="header-welcome">WELCOME</h1>

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

              <img
                src="./Icons/welcome-user-90.png"
                width="30px"
                className="input-logo"
                alt="user icon"
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
              <img
                src="./Icons/welcome-lock.png"
                width="30px"
                className="input-logo"
                alt="icon of a lock to symbolise password field"
              />
            </div>
          </form>
          {/* got a warning: The href attribute is required for an anchor to be keyboard accessible. Provide a valid, navigable address as the href value. */}
          {/* we should properly make a proper fix */}
          <a href="#/" className="forgot-pass" onClick={goToPasswordRequest}>
            Forgot password?
          </a>
          <div className="login-button">
            <Button text="Login" click={handleLogIn} />
          </div>
          <Link className="signup-button" to="signUp">
            <Button text="Sign Up" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
