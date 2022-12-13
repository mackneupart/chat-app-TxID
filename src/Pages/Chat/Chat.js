// import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import ChatBox from "../../Components/ChatBox/ChatBox";
import ChatSidebar from "../../Components/ChatSidebar/ChatSidebar";
import "./Chat.css"
// import{readChats2} from "../../API/API"

export default function Chat() {
  const { state } = useLocation();
  const currentUser = state.currentUser;
  const otherUser = state.otherUser;
  
  //const navigate = useNavigate();


  return (
    // <div className="chat-page">
    //   <div className="flex_between">
    //     <h2 className="list_heading">{`${currentUser.get(
    //       "username"
    //     )} sending, ${otherUser.get("username")} receiving!`}</h2>
    //   </div>
    //   <ChatSidebar className= "chat-sidebar" chats ={chats} />
    //   <ChatBox classname = "chat-box" currentUser={currentUser} otherUser={otherUser} />
    // </div>
    <div className="chat-page">
        <div className="chat-sidebar">
          <ChatSidebar currentUser = {currentUser}/>
        </div>
        
        <ChatBox className = "chat-box" currentUser={currentUser} otherUser = {otherUser}/>
    </div>
  );
};
