
import React, { useState } from "react"
import './signIn.css';
import {
    Link,
    Navigate,
    useNavigate
  } from "react-router-dom";
import Parse from 'parse/dist/parse.min.js';


function SignIn(){

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  // Function that will return current user and also update current username
  const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
    // Update state variable holding current user
    setCurrentUser(currentUser);
    return currentUser;
  };

  const handleUserLogIn = async function () {
    // Note that these values come from state variables that we've declared before
    const usernameValue = username;
    const passwordValue = password;
    try {
      const loggedInUser = await Parse.User.logIn(usernameValue, passwordValue);
      // logIn returns the corresponding ParseUser object
      alert(
        `Success! User ${loggedInUser.get(
          'username'
        )} has successfully signed in!`
      );
      // To verify that this is in fact the current user, `current` can be used
      const currentUser = await Parse.User.current();
      console.log(loggedInUser === currentUser);
      // Clear input fields
      setUsername('');
      setPassword('');
      // Update state variable holding current user
      getCurrentUser();
      navigate("home")

      return true;
    } catch (error) {
      // Error can be caused by wrong parameters or lack of Internet connection
      alert(`Error! ${error.message}`);
      return false;
    }
  };  

    return (
        <div>
            <div className="background">
                <div className="purple-box">
                    <div className="header">
                        <img clasName="cat-logo"src="./Icons/welcome-cat.png"/>
                        <h1 className="header-welcome">WELCOME</h1>
                    </div>
                    <form>
                        <div className="input-container">
                        <input 
                        className="input-field" 
                        type="text" name="uname" 
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        placeholder="Username"
                        required
                        />

                        
                        <img src="./Icons/welcome-user-90.png" width="30px" className="input-logo"/>
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
                        <img src="./Icons/welcome-lock.png" width="30px" className="input-logo"/>
                        </div>
                    </form>
                    <a className="forgot-pass" href="http://google.com">Forgot password?</a>
                    <button 
                      className="button-default button-logIn"
                      onClick={() => handleUserLogIn()}
                      type="primary"
                      block 
                      >Login
                    </button>
                    <button className="button-default button-singUp"><Link className="button-default" to="signUp">Sign Up</Link></button>
                </div>

            </div>
               
        </div>
    )
}

export default SignIn