import React, { useEffect, useState } from "react";
import "./Home.css";
import "../../DesignSystem/grid.css";
import ChatList from "../../Components/home/ChatList";
import Button from "../../Components/Button/Button";
import { useNavigate } from "react-router-dom";
import errorKitten from "../../DesignSystem/errorKitten.jpg";
import {
  logOut,
  getCurrentUser,
  getChats,
  createChat,
  deleteUser,
} from "../../API/API";

export default function Home() {
  const navigate = useNavigate();
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const getAllChats = async () => {
      try {
        const resultC = await getChats();
        await getCurrentUser().get("profilePicture").fetch();
        //console.log(getCurrentUser().get("profilePicture").get("catPNG")._url);
        setChatList(resultC);
      } catch (error) {
        console.log(`Error when trying to get all chats: ${error}`);
      }
    };
    getAllChats();
  }, []);

  const handleLogOut = async function () {
    await logOut();
    navigate("/");
  };

  const handleDelete = async function () {
    const prompt =
      "Are you sure you want to delete your account? Press OK to delete.";
    if (window.confirm(prompt)) {
      try {
        await deleteUser(getCurrentUser());
        navigate("/");
        alert(
          "Your user was succesfully deleted. You're welcome back anytime!"
        );
      } catch (error) {
        console.log(`Error when trying to delte user! ${error}`);
      }
    } else {
      alert("User not deleted.");
    }
  };

  const addChat = async function () {
    try {
      const chat = await createChat();
      console.log(chat);
      navigate("/Chat", {
        state: { chat: chat },
      });
    } catch (error) {
      console.log(`Error when trying to get random user user: ${error}`);
    }
  };

  return (
    <div className="home-page background">
      <div className="home-box purple-box">
        <div className="userBox white-box">
          <div className="userImage">
            <img
              className="circle"
              src={
                getCurrentUser()
                  ? getCurrentUser().get("profilePicture").get("catPNG")._url
                  : errorKitten
              }
              alt="the users profile pic"
            />
          </div>
          <div className="userInfo">
            <div className="userInfoDetail">Username</div>
            <div className="userInfoPlaceholder">
              {getCurrentUser() !== null
                ? getCurrentUser().get("username")
                : "not working"}
            </div>
            <div className="userInfoDetail">Email</div>
            <div className="userInfoPlaceholder">
              {getCurrentUser() !== null
                ? getCurrentUser().get("email")
                : "not working"}
            </div>
            <div className="userInfoDetail">Target Language</div>
            <div className="userInfoPlaceholder">
              {getCurrentUser() !== null
                ? getCurrentUser().get("targetLanguage")
                : "not working"}
            </div>
            <div className="userInfoDetail">Native Language</div>
            <div className="userInfoPlaceholder">
              {getCurrentUser() !== null
                ? getCurrentUser().get("nativeLanguage")
                : "not working"}
            </div>
          </div>
          <div className="user-buttons">
            <Button text="Delete profile" click={handleDelete} />
            <Button text="Log out" click={handleLogOut} />
          </div>
        </div>
        <div className="chatOverview">
          <div className="chat">
            {chatList && <ChatList chatList={chatList} />}
          </div>
          <div className="newChats">
            <div className="newChat">
              <Button text="New Chat" click={addChat} />
            </div>
            <div className="newGroupChat">
              <Button text="New Group Chat" click={addChat} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
