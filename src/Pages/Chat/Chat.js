import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import ChatBox from "../../Components/ChatBox/ChatBox";
import ChatSidebar from "../../Components/ChatSidebar/ChatSidebar";
import { getCurrentUser } from "../../API/API";
import "./Chat.css";

export default function Chat() {
  const { state } = useLocation();
  const otherUser = state.otherUser;
  const chat = state.chat;
  const navigate = useNavigate();

  //TODO go to SignIn if not loged in

  const goHome = function () {
    navigate("/home");
  };

  return (
    <div className="chat-page">
      <img
        className="home-icon"
        src="./Icons/home.png"
        alt="Home icon"
        onClick={goHome}
      />
      <div className="chat-partner">
        {/*  <img className="partner-pic" src={otherUser.get("profilePicture").get("catPNG")._url}/>  */}
        <header className="partner-name">{otherUser.get("username")}</header>
      </div>
      <div className="chat-sidebar">
        <ChatSidebar />
      </div>
      <ChatBox chat={chat} />
    </div>
  );
}
