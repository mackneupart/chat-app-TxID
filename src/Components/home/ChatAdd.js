import React, { useState } from "react";

const ChatAdd = (addChat) => {
    console.log("this is tjek")
    console.log(addChat)
    const [ newChat, setNewChat ] = useState('');

    const addChatHandler = () => {
        addChat(newChat);
        setNewChat('');
    };

    return (
        <div>
            <button onClick={addChatHandler}>New Chat</button>
        </div>
    )
}

export default ChatAdd;