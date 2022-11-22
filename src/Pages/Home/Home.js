import React, { useState } from "react";
import "./Home.css";
import UserData from "../../Components/UserData";
import ChatList from "../../Components/home/ChatList";
import Button from "../../Components/Button/Button";
import Parse from 'parse/dist/parse.min.js';
import { Navigate, useNavigate} from "react-router-dom";


export default function Home() {
  const navigate = useNavigate();
  const [chatList, setChatList] = useState(UserData);
  const getMainUser = (user) => {
    return UserData.find((u) => u.id === user);
  };
  const mainUser = getMainUser("01");
  
  const [currentUser, setCurrentUser] = useState(null);
  
  const getCurrentUser = async function () {
    const currentUser = await Parse.User.current();
    // Update state variable holding current user
    setCurrentUser(currentUser);
    return currentUser;
  };

  getCurrentUser();

  const logOutUser = async function () {
    try {
      await Parse.User.logOut();
      // To verify that current user is now empty, currentAsync can be used
      const currentUser = await Parse.User.current();
      if (currentUser === null) {
        alert('Success! No user is logged in anymore!');
      }
      // Update state variable holding current user
      getCurrentUser();
      navigate("/")
      return true;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  };
  
  function addChat() {
    setChatList([
      ...chatList,
      {
        chat: [
          {
            id: Math.random().toString(),
            username: "Kitty What Up",
            TL: "French",
            NL: "English",
            image:
              "https://media.npr.org/assets/img/2021/08/11/gettyimages-1279899488_wide-f3860ceb0ef19643c335cb34df3fa1de166e2761-s1100-c50.jpg",
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

  return (
    <div>
      <div className="home-page background">
        <div className="box">
          <div className="userBox">
            <div className="userImage">
              <img
                className="circle"
                src={mainUser.image}
                alt="the users profile pic"
              />
            </div>
            <div className="userInfo">

              <div className="userInfoDetail">Username</div>
              <div className="userInfoPlaceholder">{currentUser !== null  ? currentUser.get('username'): "not working"}</div>
              <div className="userInfoDetail">Email</div>
              <div className="userInfoPlaceholder">{currentUser !== null  ? currentUser.get('email'): "not working"}</div>
              <div className="userInfoDetail">Target Language</div>
              <div className="userInfoPlaceholder">{currentUser !== null  ? currentUser.get('targetLanguage'): "not working"}</div>
              <div className="userInfoDetail">Native Language</div>
              <div className="userInfoPlaceholder">{currentUser !== null  ? currentUser.get('nativeLanguage'): "not working"}</div>
            </div>
            <div className="settingsButton">
              <Button text="Settings" />
              <Button text="Log out" click={logOutUser} />
            </div>
          </div>
          <div className="chatOverview">
            <div className="chat">
              <ChatList chatList={chatList} />
            </div>
            <div className="newChats">
              <div className="newChat">
                <Button click={addChat} text="New Chat" />
              </div>
              <div className="newGroupChat">
                <Button click={addGroupChat} text="New Group Chat" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}