import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Parse from "parse";
import Button from "../../Components/Button/Button";
import "./signIn.css";
import "../../DesignSystem/grid.css";

function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [click, setClick] = useState(false);

  useEffect(() => {
    if (click) {
      console.log("click is " + click);
      const handleUserLogIn = async () => {
        console.log("sign up clicked");
        try {
          // logIn returns the corresponding ParseUser object
          const loggedInUser = await Parse.User.logIn(username, password);

          console.log(
            `Success! User ${loggedInUser.get(
              "username"
            )} has successfully signed in!`
          );
          // To verify that this is in fact the current user, `current` can be used
          setCurrentUser(Parse.User.current());
          console.log(loggedInUser === currentUser);
          // Clear input fields
          setUsername("");
          setPassword("");
          setClick(false);

          navigate("/home");
        } catch (error) {
          setClick(false);
          // Error can be caused by wrong parameters or lack of Internet connection
          alert(`Error! ${error.message}`);
          // return false;
        }
      };

      handleUserLogIn().catch(console.error);
    }
    /**
     * the line below is needed to stop getting warnings about missing dependencies, which shouldn't
     * be added, because we don't want it to render when they change
     */
    // eslint-disable-next-line
  }, [click]);

  const login = () => {
    console.log("change setClick");
    setClick(!click);
  };

  const goToPasswordRequest = () => {
    navigate("passwordReset");
  };

  /*   // Function that will return current user and also update current username
  const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
    // Update state variable holding current user
    setCurrentUser(currentUser);
    return currentUser;
  }; */

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
          <a className="forgot-pass" onClick={goToPasswordRequest}>
            Forgot password?
          </a>
          <div className="login-button">
            <Button text="Login" click={login} />
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
