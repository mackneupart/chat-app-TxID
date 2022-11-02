
import React, { useState } from "react"
import {
    BrowserRouter,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import SignUp from './SignUp';

function SignIn(){

    const[username,setUserName] = useState("");


    return (
        <div>
            <div className="background">
                <div className="purple-box">

                    <div className="header">
                        <img src="./Icons/welcome-cat.png"/>
                        <h1 className="header-welcome">WELCOME</h1>
                    </div>
                    <form>
                        <div className="input-container">
                        <input className="input-field" type="text" placeholder="username"/>
                        <img src="./Icons/welcome-user-90.png" width="30px" className="input-logo"/>
                        </div>

                        <div className="input-container">
                        <input className="input-field" type="text" placeholder="password"/>
                        <img src="./Icons/welcome-lock.png" width="30px" className="input-logo"/>
                        </div>
                    </form>
                    <a href="http://google.com">Forgot password?</a>
                    <button className="button-default button-logIn"><Link className="button-text" to="home">Login</Link></button>
                    <button className="button-default button-singUp"><Link className="button-text" to="signUp">Sign Up</Link></button>



                </div>
            </div>
               
        </div>
    )
}

export default SignIn
