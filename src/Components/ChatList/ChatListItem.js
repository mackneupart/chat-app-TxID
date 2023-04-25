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
    for (var user of users) {
      if (user.id !== getCurrentUser().id) {
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
      <div className="chat-list">
        <div className="delete-chat">
          {location.pathname === "/home" ? (
            <button className="delete-chat-button" onClick={handleDeleteChat}>
              X
            </button>
          ) : (
            ""
          )}
        </div>
        <div className="chat-list-item-box">
          <ul className="chat-list-item-info list-group">
            {otherUsers.map((otherUser) => {
              return (
                <li
                  key={otherUser.id}
                  onClick={handleClick}
                  className="chat-list-item-info-name list-group-item">
                  {otherUser.get("username")}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}
