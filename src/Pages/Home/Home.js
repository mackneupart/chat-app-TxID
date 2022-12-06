import React, { useEffect, useState } from "react";
import "./Home.css";
import "../../DesignSystem/grid.css";
//import UserData from "../../Components/UserData";
import ChatList from "../../Components/home/ChatList";
import Button from "../../Components/Button/Button";
import { useNavigate } from "react-router-dom";
import errorKitten from "../../DesignSystem/errorKitten.jpg";
import {
  getProfilePicture,
  getRandomUser,
  logOutUser,
  readCurrentUser,
} from "../../API/API";

export default function Home() {
  const navigate = useNavigate();
  const [chatList, setChatList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [userPic, setUserPic] = useState(null);
  const [randomUser, setRandomUser] = useState();
  
  useEffect(() => {
    /**
     * create a variable to manage when the userdata should be changed
     * should be made when the settings page/button has been created
     */
    //let isUpdated = true;
    const getCurrentUser = async () => {
      try {
        const resultU = await readCurrentUser();
        const resultP = await getProfilePicture();
        const resultR = await getRandomUser();
        setCurrentUser(resultU);
        setUserPic(resultP[0]);
        setRandomUser(resultR);
      } catch (error) {
        console.log(`Error when trying to read current user: ${error}`);
      }
    };
    getCurrentUser();
    /* 
    const fetchCurrentUser = async () => {
      try {
        const currentUser = await Parse.User.current();
        // Update state variable holding current user
        if (isUpdated) {
          setCurrentUser(currentUser);
          /* console.log("this is current user");
          console.log(currentUser);
          console.log("this is profile pic uri");
          console.log(currentUser.get("profilePicture").url()); */
    /*}
      } catch (error) {
        alert(`Error trying to fetch current user! ${error.message}`);
      }
    };

    fetchCurrentUser().catch(console.error);

    return () => (isUpdated = false); */
  }, []); //right now it will only render once. When settings have been implementet, change this

  /*   useEffect(() => {
    console.log("this is current user");
    if (currentUser) {
      console.log(currentUser);
      /* const icon = currentUser.get("profilePicture");
      console.log("this is icon ---- profilePicture");
      console.log(icon);
      setUserPic(icon);
      console.log(icon.id) */ /*
    }
  }, [currentUser]);

  useEffect(() => {
    console.log("this is getting profile pic");
    if (userPic) {
      console.log(userPic);
    }
  }, [userPic]);
 */ /*
  useEffect(() => {
    console.log("this is random user");
    if (randomUser) {
      console.log(randomUser);
    }
  }, [randomUser]);

  /* const logOutUser = async function () {
    try {
      await Parse.User.logOut();
      // To verify that current user is now empty, currentAsync can be used
      const currentUser = await Parse.User.current();
      if (currentUser === null) {
        alert("Success! No user is logged in anymore!");
      }
      // Update state variable holding current user
      //getCurrentUser();
      setCurrentUser(null);
      navigate("/");
      return true;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  }; */

  const getRanUser = async () => {
    try {
      setRandomUser(await getRandomUser());
    } catch (error) {
      console.log(`Error when trying to get random user user: ${error}`);
    }
  };

  const logOut = async function () {
    try {
      if (logOutUser()) {
        setCurrentUser(null);
        navigate("/");
      }
    } catch (error) {
      console.log(`Error when trying to log out user! ${error}`);
    }
  };

  function handleNewChat() {
    navigate("/Chat");
    // should also give props about which chat was clicked or if 'new chat' was clicked
  }


  function addChat() {
    getRanUser();
    console.log("this is random users state: ", randomUser);
    console.log("this is random users id: ", randomUser.id);

    console.log("addchat clicked and entered");
    setChatList([
      ...chatList,
      {
        chat: [
          {
            id: randomUser.id,
            username: randomUser.get("username"),
            TL: randomUser.get("targetLanguage"),
            NL: randomUser.get("nativeLanguage"),
            image: userPic.get("catPNG")._url,
          },
        ],
      },
    ]);
  }

  function addGroupChat() {
    setChatList([
      ...chatList,
      {
        groupChat: [
          {
            id: Math.random().toString(),
            username: "Kitty",
            TL: "Spanish",
            NL: "Danish",
            image:
              "https://th-thumbnailer.cdn-si-edu.com/bZAar59Bdm95b057iESytYmmAjI=/1400x1050/filters:focal(594x274:595x275)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/95/db/95db799b-fddf-4fde-91f3-77024442b92d/egypt_kitty_social.jpg",
            interest: "Knitting",
          },
          {
            id: Math.random().toString(),
            username: "Kat",
            TL: "Spanish",
            NL: "Danish",
            image:
              "https://i.pinimg.com/originals/ed/08/bf/ed08bf6bff9e2e870d96b976c23829c8.jpg",

            interest: "Knitting",
          },
        ],
      },
    ]);
  }

  function settingAlert() {
    alert("Settings Button was pressed!");
  }

  /*   function getProfilePic() {
    if (currentUser !== null) {
      try {
        console.log("this is getting profile pic");
        console.log(currentUser.get("profilePicture")._url);
        const url = currentUser.get("profilePicture")._url;
        if (url !== null || url !== undefined) {
          return url;
        }
      } catch (error) {
        console.log("Error getting profile picture: " + error);
      }
    }
    return errorKitten;
  } */

  return (
    <div className="home-page background">
      <div className="home-box purple-box">
        <div className="userBox white-box">
          <div className="userImage">
            <img
              className="circle"
              src={userPic ? userPic.get("catPNG")._url : errorKitten}
              alt="the users profile pic"
            />
          </div>
          <div className="userInfo">
            <div className="userInfoDetail">Username</div>
            <div className="userInfoPlaceholder">
              {currentUser !== null
                ? currentUser.get("username")
                : "not working"}
            </div>
            <div className="userInfoDetail">Email</div>
            <div className="userInfoPlaceholder">
              {currentUser !== null ? currentUser.get("email") : "not working"}
            </div>
            <div className="userInfoDetail">Target Language</div>
            <div className="userInfoPlaceholder">
              {currentUser !== null
                ? currentUser.get("targetLanguage")
                : "not working"}
            </div>
            <div className="userInfoDetail">Native Language</div>
            <div className="userInfoPlaceholder">
              {currentUser !== null
                ? currentUser.get("nativeLanguage")
                : "not working"}
            </div>
          </div>
          <div className="user-buttons">
            <Button text="Settings" click={settingAlert} />
            <Button text="Log out" click={logOut} />
          </div>
        </div>
        <div className="chatOverview">
          <div className="chat">
            <ChatList chatList={chatList} />
          </div>
          <div className="newChats">
            <div className="newChat">
              <Button text="New Chat" click={handleNewChat} />
            </div>
            <div className="newGroupChat">
              <Button text="New Group Chat" click={addGroupChat} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
