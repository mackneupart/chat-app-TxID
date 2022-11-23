
import "./ChatTest.css";
//import Message from "../../Components/Message/Message";
import ChatBox from "../../Components/ChatBox/ChatBox";


export default function ChatTest() {
  //get real current User
  const currentUser = "User1"

  return (
    <div className="chat-page">
        <ChatBox currentUser={currentUser}/>
    </div>
  );
}
