import LanguageDropdown from "../../Components/language/LangugageDropdown";
//import TextInput from "../../Components/text/TextInput";
import InterestList from "../../Components/InterestList/InterestList";
import "./SignUp.css";
import "../../DesignSystem/grid.css";
import { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import { CreateUser, ReadCatIcons, getRandomUser } from "../../API/API";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nativeLanguage, setNativeLanguage] = useState([]);
  const [targetLanguage, setTargetLanguage] = useState([]);
  const [catIcons, setCatIcons] = useState({});
  const [userPic, setUserPic] = useState(null);
  const [change, setChange] = useState(false);
  const [count, setCount] = useState(0);
  //const navigate = useNavigate();

  useEffect(() => {
    console.log("this is useeffect");
    console.log(count);
    setCount(count + 1);
    console.log(count);
    console.log(change);
    const getCatIcons = async function () {
      const result = ReadCatIcons().then(
        setCatIcons({ ...catIcons, ...result })
      );

      console.log("this is result");
      console.log(result);
      /* if (change) {
        setCatIcons({ ...catIcons, ...result });
        console.log("this is catIcons");
        console.log(catIcons);
      } */
    };
    getCatIcons();
  }, [change]);

  function makeProfileSelection() {
    if (count === 1) {
      console.log("this is if statement");
      setCount(2);
      setChange(true);
      console.log(change);
    }
    try {
      return (
        <div>
          {catIcons.map((catIcon) => (
            <img
              alt={catIcon !== null ? catIcon.get("name") : "not working :("}
              src={catIcon !== null ? catIcon.get("source") : "altText"}
              onClick={() => handleSelect(catIcon.get("source"))}
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

  function handleSubmit() {
    if (
      CreateUser(
        username,
        password,
        email,
        nativeLanguage,
        targetLanguage,
        userPic
      )
    ) {
      console.log("this is random user");
      console.log(getRandomUser());
      //navigate("/");
    }
  }

  return (
    <div className="sign-up-page">
      <div className="purple-box profile-box">
        {/* <img
          className="selected-pic"
          id="ProfilePicture"
          alt="Profile"
          src={catIcons !== null ? catIcons[0].get("catPNG")._url : "altText"}
        />  */}

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
          <Button text="Sign Up" click={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
