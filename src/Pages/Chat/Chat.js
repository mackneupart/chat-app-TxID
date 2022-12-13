import { Navigate, useNavigate, useLocation } from "react-router-dom";
import ChatBox from "../../Components/ChatBox/ChatBox";
import ChatSidebar from "../../Components/ChatSidebar/ChatSidebar";
import { logOutUser } from "../../API/API";
import Button from "../../Components/Button/Button";
import "./Chat.css"

export default function Chat() {
  const { state } = useLocation();
  const currentUser = state.currentUser;
  const otherUser = state.otherUser;
  const navigate = useNavigate();

  const handleLogout = async function () {
    try {
      if (logOutUser()) {
        navigate("/");
      }
    } catch (error) {
      console.log(`Error when trying to log out user! ${error}`);
    }
  };

  const goHome = function () {
    navigate("/home", {
      state: {currentUser : currentUser },
      // The navigation to and from Home needs fixing, screen goes blank but works on refresh. /cema
    });
  }
  
  return (
    <div className="chat-page">
      <div className="topbar">
        <img
            className="home-icon"
            src="./Icons/home.png"
            alt="Home icon"
            onClick={goHome}
          />
        <div className="chat-partner">
          <img src={otherUser.get("profilePicture").get("catPNG")._url}/>  
          {/* We should clean up  the functions for getting profile pic
          in the API !!! /cema */}
          <header className="partner-name">{otherUser.get("username")}</header>
        </div>
        <Button className="logout-button" text="Log out" click={handleLogout}/>
      </div>
      <div className="chat-sidebar">
        <ChatSidebar currentUser = {currentUser}/>
      </div>
      <ChatBox className = "chat-box" currentUser={currentUser} otherUser = {otherUser}/>
    </div>
  );
};
