import { getCurrentUser } from "../../API/API";
import "./Message.css";

// Helper to format createdAt value on Message
const formatDateToTime = (date) => {
  return `${date.getDay()}.${date.getMonth()}. ${date.getHours()}:${date.getMinutes()}`;
};

export default function Message({ message }) {
  /* var sender = "";
  if (message.get("chat").get("users")[0].id === getCurrentUser().id) {
    sender = message.get("chat").get("users")[0].get("username");
  } else {
    sender = message.get("chat").get("users")[1].get("username");
  } */

  const sender = message.get("sender");
  const content = message.get("text");
  const timestamp = formatDateToTime(message.get("createdAt"));

  const sentByMe = () => {
    if (sender === getCurrentUser().id) {
      return true;
    }
    return false;
  };

  const getAuthor = () => {
    if (sender === message.get("chat").get("users")[0].id ) {
      return message.get("chat").get("users")[0].get("username");
    }
    return message.get("chat").get("users")[1].get("username");
  };

  return (
    <div className="message" type={sentByMe() ? "sent" : "received"}>
      <div className="author">{getAuthor()}</div>
      <div className="content" type={sentByMe() ? "sent" : "received"}>
        {content}
      </div>
      <div className="timestamp">{timestamp}</div>
    </div>
  );
}
