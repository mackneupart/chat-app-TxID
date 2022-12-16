import React from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../API/API";
import "./ChatListItem.css";

const ChatListItem = ({ chat }) => {
  const navigate = useNavigate();

  var otherUser = {};
  if (chat.get("users2")[0].id === getCurrentUser().id) {
    otherUser = chat.get("users2")[1];
  } else {
    otherUser = chat.get("users2")[0];
  }
  //const otherUserImage = otherUser.get("profilePicture").get("catPNG")._url;
  const language1 = chat.get("Language1");
  const language2 = chat.get("Language2");

  const handleClick = () => {
    navigate("/Chat", {
      state: { otherUser: otherUser, chat: chat },
    });
  };

  return (
    <div className="chat-list-item-box" onClick={handleClick}>
      <div className="chat-list-item-img-box">
        {/* <img className="chat-list-item-img" src={otherUserImage} /> */}
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
  );
};

export default ChatListItem;
