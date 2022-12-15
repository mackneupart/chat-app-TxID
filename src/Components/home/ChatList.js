import React from "react";
import ChatListItem from "./ChatListItem";
import ChatListGroupItem from "./ChatListGroupItem";
import "./ChatList.css";

const ChatList = ({ chatList, currentUser, deleteChat }) => {
  return (
    <div className="chat-list">
      {chatList.map((chat) => {
        return (
          <ChatListItem
            chat={chat}
            currentUser={currentUser}
            deleteChat={deleteChat}
          />
        );

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
