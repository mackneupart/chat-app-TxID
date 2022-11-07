import React from "react";
import { Link } from "react-router-dom";
import "./ChatListItem.css";

const ChatListItem = ({ chat }) => {
  return (
    <Link to="/">
      <div className="chat-list-item-box">
        <div className="chat-list-item-img-box">
          <img className="chat-list-item-img" src={chat.image} />
        </div>
        <div className="chat-list-item-info">
          <div className="chat-list-item-info-name">{chat.username}</div>
          <div className="chat-list-item-info-language">
            {chat.TL} / {chat.NL}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ChatListItem;
