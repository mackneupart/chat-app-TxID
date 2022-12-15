import "./ChatSidebar.css";
import ChatList from "../home/ChatList";
import { useEffect, useState } from "react";
import { readChats2 } from "../../API/API";

export default function ChatSidebar({ currentUser }) {
  const language1 = "Danish"; //currentChat language 1
  const language2 = "Spanish"; // currentChat language 2
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const getAllChats = async () => {
      try {
        if (currentUser) {
          const resultC = await readChats2(currentUser);
          setChatList(resultC);
        }
      } catch (error) {
        console.log(`Error when trying to get all chats: ${error}`);
      }
    };

    getAllChats();
    // console.log("chats in sidebar",chatList)
  }, [currentUser]);

  return (
    <div className="side-bar">
      {/* <input className="search" type="text" placeholder = "Search" onChange={searchChat} ></input> */}
      <div className="chat-list-scroll">
        <ChatList
          className="chat-list"
          chatList={chatList}
          currentUser={currentUser}
        />
      </div>

      <div className="language-radio">
        <p>Currently you are writing in:</p>
        <input
          className="radio-input"
          type="radio"
          name="current-language"
          value={language1}
        />
        <label for={language1}>{language1}</label>
        <br />
        <input
          className="radio-input"
          type="radio"
          name="current-language"
          value={language2}
        />
        <label for={language2}>{language2}</label>
      </div>
    </div>
  );
}
