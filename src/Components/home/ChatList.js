import React from "react";
import ChatListItem from "./ChatListItem";
//import ChatListGroupItem from "./ChatListGroupItem";
import "./ChatList.css";

const ChatList = ({ chatList }) => {
  console.log(chatList[0])
  return (
    <div className="chat-list">
      {chatList.map((chat) => {
        return <ChatListItem key={chat.id} chat={chat} />;

        /* if (chat.hasOwnProperty("chat")) {
          console.log(chat.hasOwnProperty("chat"));
          return <ChatListItem chat={chat} />;
        } else if (chat.hasOwnProperty("groupChat")) {
          console.log(chat.hasOwnProperty("groupChat"));
          return <ChatListGroupItem {...chat} />;
        }  */
      })}
    </div>
  );
};

export default ChatList;
