import React from "react";
import ChatListItem from "./ChatListItem";
import "./ChatList.css";

const ChatList = ({ chatList, deleteChat }) => {
  return (
    <div className="chat-list">
      {chatList.map((chat) => {
        return (
          <ChatListItem key={chat.id} chat={chat} deleteChat={deleteChat} />
        );
      })}
    </div>
  );
};

export default ChatList;
