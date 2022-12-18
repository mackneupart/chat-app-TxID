import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getCurrentUser, getUsersInChat } from "../../API/API";
import "./ChatListItem.css";

export default function ChatListItem({ chat, deleteChat }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState();

  useEffect(() => {
    const getUsers = async function () {
      const u = await getUsersInChat(chat);
      setUsers(u);
    };
    getUsers();
  }, [chat]);

  if (users) {
    var otherUsers = [];
    var images = [];
    for (var user of users) {
      if (user.id !== getCurrentUser().id) {
        images.push(user.get("profilePicture").get("catPNG")._url);
        otherUsers.push(user);
      }
    }

    const language1 = chat.get("Language1");
    const language2 = chat.get("Language2");

    const handleClick = () => {
      navigate("/Chat", {
        state: { chat: chat },
      });
    };

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
            {images.map((image) => {
              return (
                <img
                  key={image.id}
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
            <div className="chat-list-item-info-language">
              {language1} / {language2}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
