import React, { useEffect, useState } from "react";
import "./Home.css";
import "../../DesignSystem/grid.css";
import ChatList from "../../Components/ChatList/ChatList";
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
  const [targetLanguages, setTargetLanguages] = useState({});
  const [nativeLanguages, setNativeLanguages] = useState({});

  useEffect(() => {
    if (getCurrentUser() === null) {
      navigate("/");
    }
  });

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
    const getUserData = async function () {
      try {
        await getCurrentUser().get("profilePicture").fetch();
        const picture = getCurrentUser()
          .get("profilePicture")
          .get("catPNG")._url;
        setUserPicture(picture);
        const resultTarget = await getChosenLanguages(
          getCurrentUser(),
          "targetLangs"
        );
        const resultNative = await getChosenLanguages(
          getCurrentUser(),
          "nativeLangs"
        );
        setTargetLanguages(resultTarget);
        setNativeLanguages(resultNative);
      } catch (error) {
        console.log(
          `Error when trying to get data for the home page: ${error}`
        );
      }
    };
    getUserData();
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
      }
    };

    async function handleDeleteChat(chat) {
      const prompt = `Are you sure you want to delete this chat?`;
      if (window.confirm(prompt)) {
        const deletedChat = await deleteChat(chat);
        if (deletedChat) {
          const resultC = await getChats(getCurrentUser());
          setChatList(resultC);
        } else {
          alert("The chat wasn't deleted. Try Again ;)")
        }
      }
    }

    const addChat = async function () {
      try {
        const chat = await createChat();
        if (chat) {
          navigate("/Chat", {
            state: { chat: chat },
          });
        } else {
          alert(`You have matched with all available users :D `);
        }
      } catch (error) {
        console.log(`Error when adding a new chat: ${error}`);
      }
    };

    const addGroupChat = async function () {
      try {
        const chat = await createGroupChat();
        if (chat) {
          navigate("/Chat", {
            state: { chat: chat },
          });
        } else {
          alert(`You have matched with all available users :D `);
        }
      } catch (error) {
        console.log(`Error when adding a new group chat: ${error}`);
      }
    };

    const renderLanguages = (langType) => {
      var str = "";
      var separator = "";
      for (var key in langType) {
        const lang = langType[key];
        str = str + separator + lang.get("name");
        separator = ", ";
      }
      return str;
    };

    const renderContent = () => {
      return (
        <>
          <div className="user-box">
            <div className="user-image">
              <img
                className="circle"
                src={getCurrentUser() ? userPicture : errorKitten}
                alt="the users profile pic"
              />
            </div>
            <div className="user-info">
              <div className="user-info-detail">Username</div>
              <div className="user-info-placeholder">
                {getCurrentUser() !== null
                  ? getCurrentUser().get("username")
                  : "not working"}
              </div>
              <div className="user-info-detail">Target Language</div>
              <div className="user-info-placeholder">
                {targetLanguages && renderLanguages(targetLanguages)}
              </div>
              <div className="user-info-detail">Native Language</div>
              <div className="user-info-placeholder">
                {nativeLanguages && renderLanguages(nativeLanguages)}
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
                  You currently have no active chats. Press 'Add chat' to match with another language learner.
                </div>
              )}
            </div>
          </div>
          <div className="new-chats">
            <div className="new-chat">
              <Button text="New Chat" click={addChat} />
            </div>
            <div className="new-group-chat">
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
