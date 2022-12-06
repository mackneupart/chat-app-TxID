import React from "react";
import { useNavigate } from "react-router-dom";
import "./ChatListItem.css";

const ChatListItem = ({ chat }) => {
  const navigate = useNavigate();
  const currentUser = chat.get("users2")[0];
  const otherUser = chat.get("users2")[1];
  /* const currentUserName = chat.get("users2")[0].get("username"); */
  const otherUserName = chat.get("users2")[1].get("username");
  /* const currentUserImage = chat
    .get("users2")[0]
    .get("profilePicture")
    .get("catPNG")._url; */
  const otherUserImage = chat
    .get("users2")[1]
    .get("profilePicture")
    .get("catPNG")._url;
  const language1 = chat.get("Language1");
  const language2 = chat.get("Language2");

  const handleClick = () => {
    navigate("/Chat", {
      state: { otherUser: otherUser, currentUser: currentUser },
    });
  };

  return (
    <div className="chat-list-item-box" onClick={handleClick}>
      <div className="chat-list-item-img-box">
        <img className="chat-list-item-img" src={otherUserImage} />
      </div>
      <div className="chat-list-item-info">
        <div className="chat-list-item-info-name">{otherUserName}</div>
        <div className="chat-list-item-info-language">
          {language1} / {language2}
        </div>
      </div>
    </div>
  );
};

export default ChatListItem;
