import React from "react";
import ChatListItem from "./ChatListItem";
import "./ChatList.css";

const ChatList = ({ chatList }) => {
  console.log(chatList[0])
  return (
    <div className="chat-list">
      {chatList.map((chat) => {
        return <ChatListItem key={chat.id} chat={chat} />;
      })}
    </div>
  );
};

export default ChatList;
