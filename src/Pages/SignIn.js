
import React from "react"

function SignIn(){
    return (
        <div>
            <div className="background">
                <div className="purple-box">
                    <div className="header">
                        <img src="./Icons/welcome-cat.png"/>
                        <h1 className="header-welcome">WELCOME</h1>
                    </div>
                    <div className="username">
                    <input className="input-username" type="text"/>
                    <img src="./Icons/welcome-user-90.png" width="30px"/>
                    </div>
                    <div className="password">
                    <input className="input-password" type="text"/>
                    <img src="./Icons/welcome-lock.png" width="30px"/>
                    <a href="http://google.com">Forgot password</a>

                    </div>
                    <button>Log in</button>
                    <button>Sign up</button>



                </div>
            </div>
               
        </div>
    )
}

export default SignIn
