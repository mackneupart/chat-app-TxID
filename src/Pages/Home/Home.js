import React, { useEffect, useState } from "react";
import "./Home.css";
import "../../DesignSystem/grid.css";
import ChatList from "../../Components/home/ChatList";
import Button from "../../Components/Button/Button";
import { useNavigate } from "react-router-dom";
//import errorKitten from "../../DesignSystem/errorKitten.jpg";
import {
  getRandomUser,
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

  /*  function handleNewChat() {
    navigate("/Chat");
    // should also give props about which chat was clicked or if 'new chat' was clicked
  } */

  const addChat = async function () {
    try {
      const otherUser = await getRandomUser();
      const chat = await createChat(otherUser);
      console.log("a chat has been added. This is what is in the chat:")
      console.log(chat);
      navigate("/Chat", {
        state: { otherUser: otherUser, chat: chat },
      });
    } catch (error) {
      console.log(`Error when trying to get random user user: ${error}`);
    }
  };

  function addGroupChat() {
    setChatList([
      ...chatList,
      {
        groupChat: [
          {
            id: Math.random().toString(),
            username: "Kitty",
            TL: "Spanish",
            NL: "Danish",
            image:
              "https://th-thumbnailer.cdn-si-edu.com/bZAar59Bdm95b057iESytYmmAjI=/1400x1050/filters:focal(594x274:595x275)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/95/db/95db799b-fddf-4fde-91f3-77024442b92d/egypt_kitty_social.jpg",
            interest: "Knitting",
          },
          {
            id: Math.random().toString(),
            username: "Kat",
            TL: "Spanish",
            NL: "Danish",
            image:
              "https://i.pinimg.com/originals/ed/08/bf/ed08bf6bff9e2e870d96b976c23829c8.jpg",

            interest: "Knitting",
          },
        ],
      },
    ]);
  }

  return (
    <div className="home-page background">
      <div className="home-box purple-box">
        <div className="userBox white-box">
          <div className="userImage">
            {/* <img
              className="circle"
              src={
                getCurrentUser()
                  ? getCurrentUser().get("profilePicture").get("catPNG")._url
                  : errorKitten
              }
              alt="the users profile pic"
            /> */}
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
              <Button text="New Group Chat" click={addGroupChat} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
