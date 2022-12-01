
import "./ChatTest.css";
import { useState } from "react";
import ChatBox from "../../Components/ChatBox/ChatBox";
import ChatSidebar from "../../Components/ChatSidebar/ChatSidebar";
import UserData from "../../Components/UserData";


export default function ChatTest() {
  //get real current User
  const currentUser = "User1"
  const currentChat = "ThisChat"
  const [chats, setChats] = useState(UserData);

  return (
    <div className="chat-page">
        <div className="chat-sidebar">
          <ChatSidebar chats = {chats}/>
        </div>
        
        <ChatBox className = "chat-box" currentUser={currentUser} currentChat = {currentChat}/>
    </div>
  );
}
