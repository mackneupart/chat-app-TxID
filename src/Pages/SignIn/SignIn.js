import React, { useEffect, useState } from "react";
import "./signIn.css";
import "../../DesignSystem/grid.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Parse from "parse/dist/parse.min.js";
import Button from "../../Components/Button/Button";

function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    var check = false;

    if (loggedIn) {
      check = true;
    }

    const handleUserLogIn = async () => {
      console.log("sign up clicked");
      // Note that these values come from state variables that we've declared before
      const usernameValue = username;
      const passwordValue = password;
      try {
        const loggedInUser = await Parse.User.logIn(username, password);

        if (check) {
          // logIn returns the corresponding ParseUser object
          alert(
            `Success! User ${loggedInUser.get(
              "username"
            )} has successfully signed in!`
          );
          // To verify that this is in fact the current user, `current` can be used
          setCurrentUser(await Parse.User.current());
          console.log(loggedInUser === currentUser);
          // Clear input fields
          setUsername("");
          setPassword("");
          // Update state variable holding current user
          //getCurrentUser();
          navigate("home");
        }

        // return true;
      } catch (error) {
        // Error can be caused by wrong parameters or lack of Internet connection
        alert(`Error! ${error.message}`);
        // return false;
      }
    };

    handleUserLogIn().catch(console.error);

    return () => (check = false);
  }, [loggedIn]);

  const login = () => {
    setLoggedIn(true);
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
          {" "}
          {/* important that box is first, otherwise children will display wrong */}
          <div className="header">
            <img clasName="cat-logo" src="./Icons/welcome-cat.png" />
            <h1 className="header-welcome">WELCOME</h1>
          </div>
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
              />
            </div>
            <div className="input-container">
              <input
                className="input-field"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                name="pass"
                placeholder="password"
                required
              />
              <img
                src="./Icons/welcome-lock.png"
                width="30px"
                className="input-logo"
              />
            </div>
          </form>
          <a className="forgot-pass" href="http://google.com">
            Forgot password?
          </a>
          <div className="sign-in-buttons">
            <Button text="Login" click={login} />
            <Button text="Sign Up">
              <Link to="signUp" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
