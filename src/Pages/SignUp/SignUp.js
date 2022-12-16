import LanguageDropdown from "../../Components/language/LangugageDropdown";
import InterestList from "../../Components/InterestList/InterestList";
import "./SignUp.css";
import "../../DesignSystem/grid.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import { createUser, readCatIcons } from "../../API/API";

export default function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nativeLanguage, setNativeLanguage] = useState([]);
  const [targetLanguage, setTargetLanguage] = useState([]);
  const [catIcons, setCatIcons] = useState(null);
  const [userPic, setUserPic] = useState(null);

  useEffect(() => {
    const getCatIcons = async () => {
      try {
        const result = await readCatIcons();
        setCatIcons(result);
      } catch (error) {
        console.log(`Error when trying to read cat icons: ${error}`);
      }
    };
    getCatIcons();
  }, []);

  useEffect(() => {
    console.log("this is catIcons");
    console.log(catIcons);
    if (catIcons) {
      console.log("Set profile pic to ", catIcons[0].get("name"));
      const defaultIcon = catIcons[0];
      setUserPic(defaultIcon);
      console.log(defaultIcon);
    }
  }, [catIcons]);

  function makeProfileSelection() {
    try {
      return (
        <>
          {catIcons.map((catIcon) => (
            <img
              key={catIcon.id}
              alt={catIcon.get("name")}
              src={catIcon.get("catPNG")._url}
              onClick={() => handleSelect(catIcon)}
            />
          ))}
        </>
      );
    } catch (error) {
      return false;
    }
  }

  function handleSelect(catIcon) {
    setUserPic(catIcon);
    const profPic = document.getElementById("ProfilePicture");
    profPic.src = catIcon.get("catPNG")._url;
  }

  const handleSubmit = async function () {
    await createUser(
      username,
      password,
      email,
      nativeLanguage,
      targetLanguage,
      userPic
    );
    console.log("user created. navigating to home");
    navigate("/home");
  };

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
            <input
              value={password}
              placeholder="Password"
              size="large"
              type="password"
            />
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Repeat Password"
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
        <div className="submit-button">
          <Button text="Sign Up" click={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
