import "./ChatSidebar.css";
import ChatList from "../home/ChatList";
import { useEffect, useState } from "react";
import { getChats, getCurrentUser } from "../../API/API";

export default function ChatSidebar({ chat }) {
  const language1 = chat.get("language1"); //currentChat language 1
  //const language2 = chat.get("language2"); // currentChat language 2
  const [chatList, setChatList] = useState([]);
  const [language2, setLanguage2] = useState();

  useEffect(() => {
    const getAllChats = async () => {
      try {
        const resultC = await getChats(getCurrentUser());
        setChatList(resultC);
      } catch (error) {
        console.log(`Error when trying to get all chats: ${error}`);
      }
    };

    getAllChats();
  }, []);

  useEffect(() => {
    setLanguage2(chat.get("language2"));
  }, [chat]);

  return (
    <div className="side-bar">
      {/* <input className="search" type="text" placeholder = "Search" onChange={searchChat} ></input> */}
      <div className="chat-list-scroll">
        <ChatList className="chat-list" chatList={chatList} />
      </div>

      <div className="language-radio">
        <p>Currently you are writing in:</p>
        <input
          className="radio-input"
          type="radio"
          name="current-language"
          value={language1}
        />
        <label htmlFor={language1}>{language1}</label>
        <br />
        {language2 && (
          <>
            <input
              className="radio-input"
              type="radio"
              name="current-language"
              value={language2}
            />
            <label htmlFor={language2}>{language2}</label>
          </>
        )}
      </div>
    </div>
  );
}
