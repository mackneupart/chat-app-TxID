
import React, { useState } from "react"
import './signIn.css';
import {
    Link,
    useNavigate
  } from "react-router-dom";
import { PersonComponent } from "../../PersonComponent";

function SignIn(){

    const navigate = useNavigate();
    const [errorMessages, setErrorMessages] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const database = [
        {
          username: "user1",
          password: "pass1"
        },
        {
          username: "user2",
          password: "pass2"
        }
      ];

      const errors = {
        uname: "invalid username",
        pass: "invalid password"
      };

      const handleSubmit = (event) => {
        
        var { uname, pass } = document.forms[0];

        const userData = database.find((user) => user.username === uname.value);

        if (userData) {
            if (userData.password !== pass.value) {
              // Invalid password
              setErrorMessages({ name: "pass", message: errors.pass });
            } else {
               navigate("home");
            }
          } else {
            // Username not found
            setErrorMessages({ name: "uname", message: errors.uname });
          }
        };
      
        // Generate JSX code for error message
        const renderErrorMessage = (name) =>
          name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
          );
      

    return (
        <div>
            <div className="background">
                <div className="purple-box">
                    <PersonComponent />
                    <div className="header">
                        <img clasName="cat-logo"src="./Icons/welcome-cat.png"/>
                        <h1 className="header-welcome">WELCOME</h1>
                    </div>
                    <form>
                        <div className="input-container">
                        <input className="input-field" type="text" name="uname" placeholder="username" required/>
                        <img src="./Icons/welcome-user-90.png" width="30px" className="input-logo"/>
                        </div>
                        {renderErrorMessage("uname")}

                        <div className="input-container">
                        <input className="input-field" type="password" name="pass" placeholder="password" required/>
                        <img src="./Icons/welcome-lock.png" width="30px" className="input-logo"/>
                        </div>
                        {renderErrorMessage("pass")}
                    </form>
                    <a className="forgot-pass" href="http://google.com">Forgot password?</a>
                    <button className="button-default button-logIn" onClick={handleSubmit}>Login</button>
                    <button className="button-default button-singUp"><Link className="button-default" to="signUp">Sign Up</Link></button>
                </div>

            </div>
               
        </div>
    )
}


export default SignIn