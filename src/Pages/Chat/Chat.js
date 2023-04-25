import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ChatBox from "../../Components/ChatBox/ChatBox";
import ChatSidebar from "../../Components/ChatSidebar/ChatSidebar";
import Button from "../../Components/Button/Button";
import Footer from "../../Components/Footer/Footer";
import { getCurrentUser, getUsersInChat } from "../../API/API";
import "./Chat.css";

export default function Chat() {
  const { state } = useLocation();
  const chat = state.chat;
  const [users, setUsers] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function getUsers() {
      const resultUsers = await getUsersInChat(chat);
      setUsers(resultUsers);
    }
    getUsers();
  }, [chat]);

  if (users) {
    var otherUsers = [];
    var images = [];
    for (var user of users) {
      if (user.id !== getCurrentUser().id) {
        images.push(user.get("profilePicture").get("profilePicture")._url);
        otherUsers.push(user);
      }
    }

    function goHome() {
      navigate("/home");
    }

    const goBackHandler = () => {
      navigate("/home");
    };

    return (
      <div className="chat-page">
        <Button className="go-back" text="back" click={goBackHandler} />

        <div className="chat-sidebar">
          <ChatSidebar classnamee="chat-sdbar" chat={chat} />
        </div>
        <div className="chat-partner">
          {images.map((image, index) => {
            return (
              <img
                key={index}
                className="partner-pic"
                src={image}
                alt="Other users profile icon"
              />
            );
          })}
          {otherUsers.map((otherUser) => {
            return (
              <header key={otherUser.id} className="partner-name">
                {otherUser.get("username")}
              </header>
            );
          })}
        </div>
        <ChatBox chat={chat} />
      </div>
    );
  }
}
