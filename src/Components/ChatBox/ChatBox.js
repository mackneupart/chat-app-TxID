import "./ChatBox.css"
import Message from "../Message/Message"

export default function ChatBox({currentUser, ChatID}){
    //get actual messages
    //const currentUser = currentUser
    const message1 = {
        author: "User1",
        content: "Hello I like your work",
        timestamp: "12/11/22"
    }
    const message2 = {
    author: "User2",
    content: "Thaks I really apreaciate it it took me a while to figure it aout but it fianlly worked",
    timestamp: "13/11/22"
    }
    //TODO render only last few messages change on scrupulously

    return(
        <div className="chat-box">
            <Message author = {message1.author} currentUser = {currentUser} content = {message1.content} timestamp = {message1.timestamp} />
            <Message author = {message2.author} content = {message2.content} timestamp = {message2.timestamp} />
        </div>
    )
}