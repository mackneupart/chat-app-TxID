import React, { useEffect, useState } from "react";
import "./Home.css";
import "../../DesignSystem/grid.css";
import ChatList from "../../Components/home/ChatList";
import Button from "../../Components/Button/Button";
import { useNavigate } from "react-router-dom";
import errorKitten from "../../DesignSystem/errorKitten.jpg";
import {
  getProfilePicture,
  getRandomUser,
  logOutUser,
  readCurrentUser,
  readChats,
  createChat,
} from "../../API/API";

export default function Home() {
  const navigate = useNavigate();
  const [chatList, setChatList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [userPic, setUserPic] = useState(null);
  const [randomUser, setRandomUser] = useState();
  const [chats, setChats] = useState();

  useEffect(() => {
    /**
     * create a variable to manage when the userdata should be changed
     * should be made when the settings page/button has been created
     */
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
  }, []); //right now it will only render once. When settings have been implementet, change this

  useEffect(() => {
    const getAllChats = async () => {
      try {
        if (currentUser) {
          const resultC = await readChats(currentUser);
          setChats(resultC);
          setChatList(resultC);
        }
      } catch (error) {
        console.log(`Error when trying to get all chats: ${error}`);
      }
    };

    getAllChats();
  }, [currentUser]);

  useEffect(() => {
    if (chats) {
      console.log("this is resultC");
      console.log(chats);
    }
  }, [chats]);

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

    createChat(currentUser, randomUser);

    /* navigate("/Chat", {
      state: { randomUser: randomUser, currentUser: currentUser },
    }); */
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
              <Button text="New Chat" click={addChat} />
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
