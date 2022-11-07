import React, { useState } from "react";
import "./Home.css";
import UserData from "../Components/UserData";
import ChatList from "../Components/home/ChatList";

export default function Home() {
  const [ chatList, setChatList ] = useState(UserData);

  const getMainUser = (user) => {
    return UserData.find((u) => u.id === user);
  };

  const mainUser = getMainUser("01");

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
              <button>Settings</button>
            </div>
          </div>
          <div className="chatOverview">
            <div className="chat">
            <ChatList chatList={chatList} />
            </div>
            <div className="newChats">
              <div className="newChat">this is new chat</div>
              <div className="newGroupChat">this is new group chat</div>
            </div>
          </div>
        </div>
      </div>
      
      
    </div>
  );
};
