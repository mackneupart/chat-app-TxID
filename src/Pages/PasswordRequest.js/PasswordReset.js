import { useState } from "react";
import Parse from "parse";
import "../../DesignSystem/grid.css";
import "./PasswordReset.css";
import Button from "../../Components/Button/Button";

export default function PasswordReset() {
  const [email, setEmail] = useState("");

  const checkEmail = async () => {
    const query = new Parse.Query("User");
    // Returns unique emails
    try {
      const results = await query.equalTo("email", email);
      const result = await results.find();
      if (result.length !== 0) {
        console.log("email exists");
        doRequestPasswordReset();
        setEmail("");
      } else {
        alert("No user with this email exists");
      }
    } catch (error) {
      console.log("error in checkEmail", error);
    }
  };

  //should be moved to API-page
  const doRequestPasswordReset = async function () {
    // Note that this value come from state variables linked to your text input
    const emailValue = email;
    try {
      //TODO: make a function which checks if emailValue === already existing email
      await Parse.User.requestPasswordReset(emailValue);
      alert(
        `Success! Please check ${emailValue} to proceed with password reset.`
      );
      return true;
    } catch (error) {
      // Error can be caused by lack of Internet connection
      alert(`Error! ${error}`);
      return false;
    }
  };

  return (
    <div className="password-reset">
      <div className="purple-box">
        {/* <p className="go-back" onClick={goBack}>
            back
          </p> */}
        <div className="heading-top">
          <img
            className="header-logo"
            src="./Icons/welcome-cat.png"
            alt="cat mascot"
          />
          <h1 className="heading">Forgot your password?</h1>
          <p>
            Please enter your email to receive a request to reset your password
          </p>
        </div>

        <input
          className="input"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Your account email"
        />
        <Button text="Reset password" click={checkEmail} />
      </div>
    </div>
  );
}
