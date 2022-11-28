import "./ChatBox.css"
import Message from "../Message/Message"
import { useState, useEffect } from "react"
//TODO render only last few messages change on scroll up
//todo scroll
export default function ChatBox({currentUser, currentChat}){
    //get actual messages
    

    const message1 = {
        author: "User1",
        content: "Hello I like your work",
        timestamp: "12/11/22"
    }

    const message2 = {
    author: "User2",
    content: "Thaks I really apreaciate it, it took me a while to figure it out but it fianlly worked",
    timestamp: "13/11/22"
    }
    const [messages, setMessages] = useState([message1, message2, message1,message1, message2, message2, message1])
    //setMessages([message1, message2])
    console.log(messages)
    
    //also check live chat implementation
    function handleNewMessage(author, content, timestamp){
        const newMessage ={
            author: author,
            content: content,
            timestamp: timestamp
        }
        setMessages(prevState => [...prevState, newMessage])
    }

    return(
        <div className="chat-box">
            <ul className="message-list">{messages.map((item, index) => 
                <Message author={item.author} currentUser = {currentUser} content = {item.content}  timestamp = {item.timestamp} index = {index} />
            )}
            
            
        </ul>
        </div>
    )
}