import "./SignUp.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import { createUser, getProfileIcons } from "../../API/API";

export default function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [email, setEmail] = useState("");

  const [icons, setIcons] = useState(null);
  const [userPic, setUserPic] = useState(null);

  useEffect(() => {
    async function getIcons() {
      try {
        const resultIcons = await getProfileIcons();
        setIcons(resultIcons);
        setUserPic(resultIcons[0]);
      } catch (error) {
        console.log(`Error when trying to read cat icons: ${error}`);
      }
    }
    getIcons();
  }, []);

  function makeProfileSelection() {
    try {
      return (
        <>
          {icons.map((icon) => (
            <img
              key={icon.id}
              alt={icon.get("name")}
              src={icon.get("profilePicture")._url}
              onClick={() => handleSelect(icon)}
            />
          ))}
        </>
      );
    } catch (error) {
      return false;
    }
  }

  function handleSelect(icon) {
    setUserPic(icon);
    const profPic = document.getElementById("ProfilePicture");
    profPic.src = icon.get("profilePicture")._url;
  }

  async function handleSubmit() {
    if (checkPassword()) {
      const newUser = await createUser(username, password, email, userPic);
      if (newUser) {
        navigate("/home");
      }
    } else {
      alert("Your password does not match");
    }
  }

  function checkPassword() {
    if (password === repeatPassword) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="background">
      <div className="outer-frame">
        <h1>SIGN UP FORM</h1>
        <img
          className="selected-pic"
          id="ProfilePicture"
          alt="Profile"
          src={icons !== null ? icons[0].get("profilePicture")._url : "altText"}
        />
        <div className="picture-box">
          <h5>Select a profile picture:</h5>
          <div className="picture-selection">{makeProfileSelection()}</div>
        </div>
        <div className="input-container">
          <div className="profile-input">
            <p>Username: </p>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Username"
              size="large"
              className="form_input"
            />
          </div>
          <div className="profile-input">
            <p>Email: </p>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="email"
              size="large"
              className="form_input"
            />
          </div>
          <div className="profile-input">
            <p>Password: </p>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="password"
              size="large"
              type="password"
            />
          </div>
          <div className="profile-input">
            <p>Repeat password: </p>
            <input
              value={repeatPassword}
              onChange={(event) => setRepeatPassword(event.target.value)}
              placeholder="repeat password"
              size="large"
              type="password"
            />
          </div>
        </div>
        <Button className="sign-up" text="Sign up" click={handleSubmit} />
      </div>
    </div>
  );
}
