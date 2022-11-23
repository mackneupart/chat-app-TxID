
import "./ChatTest.css";
import Message from "../../Components/Message/Message";


export default function ChatTest() {
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

  return (
    <div>
        <Message author = {message1.author} content = {message1.content} timestamp = {message1.timestamp} />
        <Message author = {message2.author} content = {message2.content} timestamp = {message2.timestamp} />
    </div>
  );
}
