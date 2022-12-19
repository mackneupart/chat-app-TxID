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
  deleteChat,
  createGroupChat,
  getChosenLanguages,
  
} from "../../API/API";

export default function Home() {
  const navigate = useNavigate();
  const [chatList, setChatList] = useState([]);
  const [userPicture, setUserPicture] = useState();
  const [targetL, setTargetL] = useState({});
  const [nativeL, setNativeL] = useState({});

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

  useEffect(() => {
    const getData = async function () {
      try {
        await getCurrentUser().get("profilePicture").fetch(); //needed in order to be able to get profile picture later
        const picture = getCurrentUser()
          .get("profilePicture")
          .get("catPNG")._url;
        setUserPicture(picture);
        const resultT = await getChosenLanguages(
          getCurrentUser(),
          "targetLangs"
        );
        const resultN = await getChosenLanguages(
          getCurrentUser(),
          "nativeLangs"
        );
        console.log(resultT);
        console.log(resultN);
        setTargetL(resultT);
        setNativeL(resultN);
      } catch (error) {
        console.log(
          `Error when trying to get data for the home page: ${error}`
        );
      }
    };
    getData();
  }, []);

  if (chatList) {
    const handleLogOut = async function () {
      await logOut();
      navigate("/");
    };

    const handleDeleteUser = async function () {
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

    async function handleDeleteChat(chat) {
      const prompt = `Are you sure you want to delete chat?`;
      if (window.confirm(prompt)) {
        const success = await deleteChat(chat);
        if (success) {
          console.log("chat was deleted");
          const resultC = await getChats(getCurrentUser());
          setChatList(resultC);
        } else {
          console.log("Something went wrong");
        }
      }
    }

    const addChat = async function () {
      try {
        const chat = await createChat();
        navigate("/Chat", {
          state: { chat: chat },
        });
      } catch (error) {
        console.log(`Error when adding a new chat: ${error}`);
      }
    };

    const addGroupChat = async function () {
      try {
        const chat = await createGroupChat();
        navigate("/Chat", {
          state: { chat: chat },
        });
      } catch (error) {
        console.log(`Error when adding a new group chat: ${error}`);
      }
    };

    const renderLang = (langType) => {
      var str = "";
      for (var key in langType) {
        const test = langType[key];
        str = str + test.get("name") + ", ";
      }
      return str;
    };

    const renderContent = () => {
      return (
        <>
          <div className="userBox white-box">
            <div className="userImage">
              <img
                className="circle"
                src={getCurrentUser() ? userPicture : errorKitten}
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
                {targetL && renderLang(targetL)}
              </div>
              <div className="userInfoDetail">Native Language</div>
              <div className="userInfoPlaceholder">
                {nativeL && renderLang(nativeL)}
              </div>
            </div>
            <div className="user-buttons">
              <Button text="Delete profile" click={handleDeleteUser} />
              <Button text="Log out" click={handleLogOut} />
            </div>
          </div>
          <div className="chat-overview">
            <div className="chat">
              {chatList.length !== 0 ? (
                <ChatList chatList={chatList} deleteChat={handleDeleteChat} />
              ) : (
                <div className="no-chat">
                  you currently have no active chats
                </div>
              )}
            </div>
          </div>
          <div className="newChats">
            <div className="newChat">
              <Button text="New Chat" click={addChat} />
            </div>
            <div className="newGroupChat">
              <Button text="New Group Chat" click={addGroupChat} />
            </div>
          </div>
        </>
      );
    };

    return (
      <div className="home-page background">
        <div className="home-box purple-box">{chatList && renderContent()}</div>
      </div>
    );
  }
}
