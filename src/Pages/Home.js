import React from "react";
import { IconContext } from "react-icons";
import { IoLogoOctocat } from "react-icons/io5";
import "./Home.css";

export default () => {
  return (
    <div className="home">
      <h1 className="page">Home page</h1>
      <div className="box">
        <div className="userBox">
          <IconContext.Provider value={{ className: "circle" }}>
            <IoLogoOctocat />
          </IconContext.Provider>
          <div className="userInfo">
            <div className="userInfoDetail">Username</div>
            <div className="userInfoPlaceholder">Bob the Cat</div>
            <div className="userInfoDetail">Target Language</div>
            <div className="userInfoPlaceholder">Español/English</div>
            <div className="userInfoDetail">Native Language</div>
            <div className="userInfoPlaceholder">Dansk</div>
          </div>
          <button className="settingsButton">Settings</button>
        </div>
        <div className="chatOverview">
          <div className="chat">this is chat 1</div>
          <div className="chat">this is chat 2</div>
          <div className="chat">this is chat 3</div>
          <div className="newChats">
            <div className="newChat">this is new chat</div>
            <div className="newGroupChat">this is new group chat</div>
          </div>
        </div>
      </div>
    </div>
  );
};
