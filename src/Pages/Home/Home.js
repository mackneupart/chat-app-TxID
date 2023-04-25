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
import MyNavbar from "../../Components/Navbar/MyNavBar";
import Footer from "../../Components/Footer/Footer";

export default function Home() {
  const navigate = useNavigate();
  const [chatList, setChatList] = useState([]);
  const [userPicture, setUserPicture] = useState();
  const [users, setUsers] = useState([]);
  // const [user, setUser] = useState("");

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
      setUsers(result);
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

  async function addChat(user) {
    try {
      const chat = await createChat(user);
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

  return (
    <>
      <MyNavbar />
      <div className="container-fluid content-items d-flex flex-column">
        <div className="row flex-grow-1">
          <div className="col-12 col-md-4 user-info">
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
              <Button click={handleLogOut} text="Logout" />
            </div>
          </div>

          <div className="col-12 col-md-4 list-heading">
            <h4>Users:</h4>
            <div className="list-of-users">
              {users.map((user) => (
                <ul className="list-group">
                  <li
                    className="list-group-item"
                    onClick={() => addChat(user.get("username"))}>
                    <p className="users">{user.get("username")}</p>
                  </li>
                </ul>
              ))}
            </div>
          </div>
          <div className="col-12 col-md-4 list-heading">
            <h4>Current chats: </h4>

            <div className="chat-overview">
              <div className="chat">
                {chatList.length !== 0 ? (
                  <ChatList chatList={chatList} deleteChat={handleDeleteChat} />
                ) : (
                  <div className="no-chat">
                    <p>You currently have no active chats.</p>
                    <p>Click on a username to start a chat.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer className="footer" />
    </>
  );
}
