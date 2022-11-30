import React, { useEffect, useState } from "react";
import "./Home.css";
import "../../DesignSystem/grid.css";
import UserData from "../../Components/UserData";
import ChatList from "../../Components/home/ChatList";
import Button from "../../Components/Button/Button";
import Parse from "parse";
import { useNavigate } from "react-router-dom";
import errorKitten from "../../DesignSystem/errorKitten.jpg";

export default function Home() {
  const navigate = useNavigate();
  const [chatList, setChatList] = useState(UserData);
  const [currentUser, setCurrentUser] = useState(null);
  const [senderID, setSenderID] = useState(Parse.User.current().id);
  const [receiverID, setReceiverID] = useState("PovaKwMIdJ"); // hardcoded, should use API for random user

  useEffect(() => {
    /**
     * create a variable to manage when the userdata should be changed
     * should be made when the settings page/button has been created
     */
    let isUpdated = true;

    const fetchCurrentUser = async () => {
      try {
        const currentUser = await Parse.User.current();
        // Update state variable holding current user
        if (isUpdated) {
          setCurrentUser(currentUser);
          /* console.log("this is current user");
          console.log(currentUser);
          console.log("this is profile pic uri");
          console.log(currentUser.get("profilePicture").url()); */
        }
      } catch (error) {
        alert(`Error trying to fetch current user! ${error.message}`);
      }
    };

    fetchCurrentUser().catch(console.error);

    return () => (isUpdated = false);
  }, []); //right now it will only render once. When settings have been implementet, change this

  const logOutUser = async function () {
    try {
      await Parse.User.logOut();
      // To verify that current user is now empty, currentAsync can be used
      const currentUser = await Parse.User.current();
      if (currentUser === null) {
        alert("Success! No user is logged in anymore!");
      }
      // Update state variable holding current user
      //getCurrentUser();
      setCurrentUser(null);
      navigate("/");
      return true;
    } catch (error) {
      alert(`Error! ${error.message}`);
      return false;
    }
  };

  function handleNewChat() {
    createChat();
    navigate("/Chat");
  }

  const createChat = async () => {
    let sender = null;
    try {
      const senderQuery = new Parse.Query("User");
      senderQuery.equalTo("objectId", senderID);
      sender = await senderQuery.first();
      console.log("sender: ", sender, "sender.id: ", sender.id)
    } catch (error) {
      alert("Parse error: Sender." + error)
      return false;
    }
    let receiver = null;
    try {
      const receiverQuery = new Parse.Query("User");
      receiverQuery.equalTo("objectId", receiverID);
      receiver = await receiverQuery.first();
      console.log("receiver: ", receiver, "receiver name: ", receiver.get("username"))
    } catch (error) {
      alert("Parse error: Receiver." + error)
      return false;
    }
    setSenderID(sender.id)
    setReceiverID(receiver.id);
    return true;
  };

  function addChat() {
    console.log("addchat clicked and entered");
    setChatList([
      ...chatList,
      {
        chat: [
          {
            id: Math.random().toString(),
            username: "Kitty What Up",
            TL: "French",
            NL: "English",
            image:
              "https://media.npr.org/assets/img/2021/08/11/gettyimages-1279899488_wide-f3860ceb0ef19643c335cb34df3fa1de166e2761-s1100-c50.jpg",
          },
        ],
      },
    ]);
  }

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

  function settingAlert() {
    alert("Settings Button was pressed!");
  }

  function getProfilePic() {
    if (currentUser !== null) {
      try {
        const url = currentUser.get("profilePicture").url();
      if (url !== null || url !== undefined) {
        return url;
      }
      } catch(error) {
        console.log("Error getting profile picture: "+ error);
      }
      
    }
    return errorKitten;
  }

  return (
    <div className="home-page background">
      <div className="home-box purple-box">
        <div className="userBox white-box">
          <div className="userImage">
            <img
              className="circle"
              src={getProfilePic()}
              alt="the users profile pic"
            />
          </div>
          <div className="userInfo">
            <div className="userInfoDetail">Username</div>
            <div className="userInfoPlaceholder">
              {currentUser !== null
                ? currentUser.get("username")
                : "not working"}
            </div>
            <div className="userInfoDetail">Email</div>
            <div className="userInfoPlaceholder">
              {currentUser !== null ? currentUser.get("email") : "not working"}
            </div>
            <div className="userInfoDetail">Target Language</div>
            <div className="userInfoPlaceholder">
              {currentUser !== null
                ? currentUser.get("targetLanguage")
                : "not working"}
            </div>
            <div className="userInfoDetail">Native Language</div>
            <div className="userInfoPlaceholder">
              {currentUser !== null
                ? currentUser.get("nativeLanguage")
                : "not working"}
            </div>
          </div>
          <div className="user-buttons">
            <Button text="Settings" click={settingAlert} />
            <Button text="Log out" click={logOutUser} />
          </div>
        </div>
        <div className="chatOverview">
          <div className="chat">
            <ChatList chatList={chatList} />
          </div>
          <div className="newChats">
            <div className="newChat">
              <Button text="New Chat" click={handleNewChat} />
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
