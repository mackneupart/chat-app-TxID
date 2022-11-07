import React, { useState } from "react";
import "./Home.css";
import UserData from "../Components/UserData";
import ChatList from "../Components/home/ChatList";
import ChatAdd from "../Components/home/ChatAdd";
import Button from "../Components/Button";

export default function Home() {
  const [chatList, setChatList] = useState(UserData);

  const getMainUser = (user) => {
    return UserData.find((u) => u.id === user);
  };

  const mainUser = getMainUser("01");

  function addChat() {
    setChatList([
      ...chatList,
      {
        id: Math.random().toString(),
        username: "Kitty What Up",
        TL: "French",
        NL: "English",
        image:
          "https://media.npr.org/assets/img/2021/08/11/gettyimages-1279899488_wide-f3860ceb0ef19643c335cb34df3fa1de166e2761-s1100-c50.jpg",
        chatType: "single",
      },
    ]);
  }

  function addGroupChat() {
    setChatList([
      ...chatList,
      {
        id: Math.random().toString(),
        username: "Kitty What Up",
        TL: "French",
        NL: "English",
        image:
          "https://media.npr.org/assets/img/2021/08/11/gettyimages-1279899488_wide-f3860ceb0ef19643c335cb34df3fa1de166e2761-s1100-c50.jpg",
        chatType: "group",
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
              <div className="userInfoPlaceholder">{mainUser.username}</div>
              <div className="userInfoDetail">Target Language</div>
              <div className="userInfoPlaceholder">{mainUser.TL}</div>
              <div className="userInfoDetail">Native Language</div>
              <div className="userInfoPlaceholder">{mainUser.NL}</div>
            </div>
            <div className="settingsButton">
              <Button text="Settings" />
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
              <div className="newGroupChat">New Group Chat</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
