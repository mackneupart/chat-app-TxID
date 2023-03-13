import React, { useEffect, useState } from "react";
import "./Home.css";
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
  listUsers,
} from "../../API/API";

export default function Home() {
  const navigate = useNavigate();
  const [chatList, setChatList] = useState([]);
  const [userPicture, setUserPicture] = useState();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (getCurrentUser() === null) {
      navigate("/");
    }
  });

  useEffect(() => {
    getUsers();
    getAllChats();
    getUserData();
  }, []);

  async function getAllChats() {
    try {
      const resultChats = await getChats();
      setChatList(resultChats);
    } catch (error) {
      console.log(`Error when trying to get all chats: ${error}`);
    }
  }

  async function getUsers() {
    try {
      const result = await listUsers();
      for (let i = 0; i < result.length; i++) {
        users[i] = result[i];
      }
      setUsers(users);
    } catch (error) {
      console.log(`Error when trying to get all users: ${error}`);
    }
  }

  async function getUserData() {
    try {
      await getCurrentUser().get("profilePicture").fetch();
      const picture = getCurrentUser()
        .get("profilePicture")
        .get("profilePicture")._url;
      setUserPicture(picture);
    } catch (error) {
      console.log(`Error when trying to get data for the home page: ${error}`);
    }
  }

  async function handleLogOut() {
    if (await logOut()) {
      navigate("/");
    }
  }

  async function handleDeleteUser() {
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
        alert(`Your user wasn't deleted properly. Please try again. ${error}`);
        console.log(`Error when trying to delte user! ${error}`);
      }
    }
  }

  async function handleDeleteChat(chat) {
    const prompt = `Are you sure you want to delete this chat?`;
    if (window.confirm(prompt)) {
      const deletedChat = await deleteChat(chat);
      if (deletedChat) {
        const resultC = await getChats(getCurrentUser());
        setChatList(resultC);
      } else {
        alert("The chat wasn't deleted. Try Again ;)");
      }
    }
  }

  async function addChat() {
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
  }

  async function addGroupChat() {
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
  }

  // if (users) {
  //   var otherUsers = [];
  //   var images = [];
  //   for (var user of users) {
  //     images.push(user.get("profilePicture").get("profilePicture")._url);
  //     otherUsers.push(user);
  //   }
  // }

  return (
    <div className="background">
      <nav className="navbar">
        <h1 className="header">
          <img
            className="header-logo"
            src="./Icons/welcome-cat.png"
            alt="cat mascot"
          />
          CHIT CHAT
        </h1>
        {/* <img className="burger-bar" src="./Icons/bar.png" alt="menu" /> */}
      </nav>
      <div className="user-box">
        <div className="user-info">
          <img
            className="profile-img"
            src={getCurrentUser() ? userPicture : errorKitten}
            alt="the users profile pic"
          />

          <div className="user-info-detail">Username: </div>
          <div className="user-info-placeholder">
            {getCurrentUser() !== null
              ? getCurrentUser().get("username")
              : "not working"}
          </div>
          <div className="user-buttons">
            <button onClick={handleDeleteUser}>Delete</button>
            <button onClick={handleLogOut}>Log out</button>
          </div>
        </div>
        <div className="container-users">
          <h4>Users:</h4>
          <div className="list-of-users">
            {users.map((user) => (
              <div>
                <p>{user.get("username")}</p>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="list-of-images">
          {images.length > 0 &&
            images.map((image, index) => (
              <div>
                <img key={index} src={image} />
              </div>
            ))}
        </div> */}
      </div>

      <div className="chat-overview">
        <div className="chat">
          {chatList.length !== 0 ? (
            <ChatList chatList={chatList} deleteChat={handleDeleteChat} />
          ) : (
            <div className="no-chat">
              <p>You currently have no active chats.</p>
              <p>Press 'New Chat' to start a new conversation.</p>
              <p>Pres 'New Group Chat' to do nothing</p>
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
    </div>
  );
}
