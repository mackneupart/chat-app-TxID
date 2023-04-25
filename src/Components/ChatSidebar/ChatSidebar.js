import "./ChatSidebar.css";
import ChatList from "../ChatList/ChatList";
import { useEffect, useState } from "react";
import { getChats, getCurrentUser } from "../../API/API";

export default function ChatSidebar({ chat }) {
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    async function getAllChats() {
      try {
        const resultC = await getChats(getCurrentUser());
        setChatList(resultC);
      } catch (error) {
        console.log(`Error when trying to get all chats: ${error}`);
      }
    }
    getAllChats();
  }, []);

  return (
    <div className="side-bar">
      <h4>Your chats</h4>
      <div className="chat-list-scroll">
        <ChatList className="chat-list" chatList={chatList} />
      </div>
    </div>
  );
}
