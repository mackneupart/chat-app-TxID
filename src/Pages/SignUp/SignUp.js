import LanguageDropdown from "../../Components/language/LangugageDropdown";
//import TextInput from "../../Components/text/TextInput";
import InterestList from "../../Components/InterestList/InterestList";
import "./SignUp.css";
import "../../DesignSystem/grid.css";
import Parse from "parse";
import { useEffect, useState } from "react";
//import { createHashRouter, Navigate, useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import { CreateUser, ReadCurrentUser } from "../../API/API";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nativeLanguage, setNativeLanguage] = useState([]);
  const [targetLanguage, setTargetLanguage] = useState([]);
  const [catIcons, setCatIcons] = useState(null);
  const [userPic, setUserPic] = useState(null);
  //const navigate = useNavigate();

  function doUserRegistration() {
    //navigate("/");
  }

  useEffect(() => {
    console.log("openeing useeffect");
    const getCatPNG = async function () {
      console.log("this is getCatpng");
      try {
        console.log("entering the try");
        const query = new Parse.Query("CatIcons");
        const icons = await query.find();
        setCatIcons(icons);
        console.log(catIcons);
      } catch (error) {
        console.log("Error in getting Cat Png: " + error);
      }
    };
    getCatPNG().catch(console.error);
  }, []);

  function makeProfileSelection() {
    //to avoid many reloads
    try {
      return (
        <div>
          {catIcons.map((catIcon) => (
            <img
              alt={catIcon !== null ? catIcon.get("name") : "not working :("}
              src={catIcon !== null ? catIcon.get("catPNG")._url : "altText"}
              onClick={() => handleSelect(catIcon.get("catPNG")._url)}
            />
          ))}
        </div>
      );
    } catch (error) {
      return false;
    }
  }

  function handleSelect(source) {
    //change profile picture to selected picture
    setUserPic(source);
    const profPic = document.getElementById("ProfilePicture");
    profPic.src = source;
  }

  return (
    <div className="sign-up-page">
      <div className="purple-box profile-box">
        <img
          className="selected-pic"
          id="ProfilePicture"
          alt="Profile"
          src={catIcons !== null ? catIcons[0].get("catPNG")._url : "altText"}
        />

        <h3>Select a profile picture:</h3>
        <div className="picture-box">
          <div className="picture-selection">{makeProfileSelection()}</div>
        </div>
      </div>

      <div className="profile-info-box">
        <div className="user-inputs">
          <div className="profile-info-labels">
            <div>
              <label>Username:</label>
            </div>
            <div>
              <label>E-mail :</label>
            </div>
            <div>
              <label>Password: </label>
            </div>
            <div>
              <label>Repeat password: </label>
            </div>
            <div>
              <label>What is your native Language</label>
            </div>
            <div>
              <label>What languages do you want to learn?</label>
            </div>
            <div>
              <label>What are your interests:</label>
            </div>
          </div>
          <div className="profile-info-inputs">
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Username"
              size="large"
              className="form_input"
            />
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="email"
              size="large"
              className="form_input"
            />
            <input type="password"></input>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              size="large"
              type="password"
            />
            <LanguageDropdown
              className="dropdown"
              setLanguage={setNativeLanguage}
            />
            <LanguageDropdown
              className="dropdown"
              setLanguage={setTargetLanguage}
            />
            <InterestList />
          </div>
        </div>

        {/** TODO password control*/}

        {/**repeat passwotd */}

        {/**TODO: show different Languages /intersts after selection */}
        <div className="submit-button">
          <Button
            text="Sign Up"
            click={CreateUser(
              username,
              password,
              email,
              nativeLanguage,
              targetLanguage,
              userPic
            )}
          />
        </div>
      </div>
    </div>
  );
}
