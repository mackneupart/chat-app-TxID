import { Navigate, useNavigate, useLocation } from "react-router-dom";
import ChatBox from "../../Components/ChatBox/ChatBox";
import ChatSidebar from "../../Components/ChatSidebar/ChatSidebar";
import Button from "../../Components/Button/Button";
import "./Chat.css"

export default function Chat() {
  const { state } = useLocation();
  const currentUser = state.currentUser;
  const otherUser = state.otherUser;
  const navigate = useNavigate();

  const goHome = function () {
    navigate("/home", {
      state: {currentUser : currentUser },
      // The navigation to and from Home needs fixing, screen goes blank but works on refresh. /cema
    });
  }
  
  return (
    <div className="chat-page">
        <img
            className="home-icon"
            src="./Icons/home.png"
            alt="Home icon"
            onClick={goHome}
          />
        <div className="chat-partner">
          <img className="partner-pic" src={otherUser.get("profilePicture").get("catPNG")._url}/>  
          {/* We should clean up  the functions for getting profile pic
          in the API !!! /cema */}
          <header className="partner-name">{otherUser.get("username")}</header>
        </div>
      <div className="chat-sidebar">
        <ChatSidebar currentUser = {currentUser}/>
      </div>
      <ChatBox className = "chat-box" currentUser={currentUser} otherUser = {otherUser}/>
    </div>
  );
};
