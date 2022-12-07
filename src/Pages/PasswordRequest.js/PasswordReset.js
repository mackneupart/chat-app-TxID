import { useState } from "react";
import Parse from "parse";
import "../../DesignSystem/grid.css";
import "./PasswordReset.css";

export default function PasswordReset() {
  const [email, setEmail] = useState("");

  const doRequestPasswordReset = async function () {
    // Note that this value come from state variables linked to your text input
    const emailValue = email;
    try {
      //TODO: make a function which checks if emailValue === already existing email
      await Parse.User.requestPasswordReset(emailValue);
      alert(`Success! Please check ${email} to proceed with password reset.`);
      return true;
    } catch (error) {
      // Error can be caused by lack of Internet connection
      alert(`Error! ${error}`);
      return false;
    }
  };
  return (
    <div>
      <div className="password-reset">
        <div className="purple-box">
          <h2 className="heading">Request password reset email</h2>
          <div className="form_wrapper">
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Your account email"
              size="large"
              className="form_input"
            />
          </div>
          <button
            onClick={() => doRequestPasswordReset()}
            type="primary"
            className="form_button"
            color={"#208AEC"}
            size="large"
          >
            Request password reset
          </button>
        </div>
      </div>
    </div>
  );
}
