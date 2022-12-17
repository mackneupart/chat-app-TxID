import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, getUsersInChat } from "../../API/API";
import "./ChatListItem.css";

export default function ChatListItem({ chat, deleteChat }) {
  const navigate = useNavigate();
  const [users, setUsers] = useState();

  useEffect(() => {
    const getUsers = async function () {
      const u = await getUsersInChat(chat);
      setUsers(u);
    };
    getUsers();
  }, [chat]);

  if (users) {
    var otherUser = {};
    if (users[0].id === getCurrentUser().id) {
      otherUser = users[1];
    } else {
      otherUser = users[0];
    }

    const otherUserImage = otherUser.get("profilePicture").get("catPNG")._url;
    const language1 = chat.get("Language1");
    const language2 = chat.get("Language2");

    const handleClick = () => {
      navigate("/Chat", {
        state: { otherUser: otherUser, chat: chat },
      });
    };

    function handleDeleteChat() {
      deleteChat(chat);
    }

    return (
      <div>
        <button className="delete-chat-button" onClick={handleDeleteChat}>
          X
        </button>
        <div className="chat-list-item-box" onClick={handleClick}>
          <div className="chat-list-item-img-box">
            <img
              className="chat-list-item-img"
              src={otherUserImage}
              alt="Other users profile icon"
            />
          </div>
          <div className="chat-list-item-info">
            <div className="chat-list-item-info-name">
              {otherUser.get("username")}
            </div>
            <div className="chat-list-item-info-language">
              {language1} / {language2}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
