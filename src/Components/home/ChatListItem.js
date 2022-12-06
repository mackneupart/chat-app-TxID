import React from "react";
import { Link } from "react-router-dom";

const ChatListItem = ({ chat }) => {
  console.log(chat.relation("usersObjects"));
  console.log(chat.relation("usersObjects").get("parent"))
   return (
    <Link to="/">
      <div className="chat-list-item-box">
        <div className="chat-list-item-img-box">
          {/* <img className="chat-list-item-img" src={chat.chat[0].image} /> */}
        </div>
        <div className="chat-list-item-info">
          <div className="chat-list-item-info-name">{/* {chat.chat[0].username} */}</div>
          <div className="chat-list-item-info-language">
            {/* {chat.chat[0].TL} / {chat.chat[0].NL} */}
          </div>
        </div>
      </div>
    </Link>
  ); 
};

export default ChatListItem;
