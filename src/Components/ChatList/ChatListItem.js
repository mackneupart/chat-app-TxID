import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getCurrentUser, getUsersInChat } from "../../API/API";
import "./ChatListItem.css";

export default function ChatListItem({ chat, deleteChat }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState();

  useEffect(() => {
    async function getUsers() {
      const u = await getUsersInChat(chat);
      setUsers(u);
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

    function handleClick() {
      navigate("/Chat", {
        state: { chat: chat },
      });
    }

    function handleDeleteChat() {
      deleteChat(chat);
    }

    return (
      <div>
        <div className="delete-chat">
          {location.pathname === "/home" ? (
            <button className="delete-chat-button" onClick={handleDeleteChat}>
              X
            </button>
          ) : (
            ""
          )}
        </div>

        <div className="chat-list-item-box" onClick={handleClick}>
          <div className="chat-list-item-img-box">
            {images.map((image, index) => {
              return (
                <img
                  key={index}
                  className="chat-list-item-img"
                  src={image}
                  alt="Other users profile icon"
                />
              );
            })}
          </div>
          <div className="chat-list-item-info">
            {otherUsers.map((otherUser) => {
              return (
                <div key={otherUser.id} className="chat-list-item-info-name">
                  {otherUser.get("username")}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
