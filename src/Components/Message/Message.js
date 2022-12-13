import "./Message.css";

// Helper to format createdAt value on Message
const formatDateToTime = (date) => {
  return `${date.getDay()}.${date.getMonth()}. ${date.getHours()}:${date.getMinutes()}`;
};

export default function Message({ message, currentUser }) {
  const sender = message.get("sender").get("username");
  const content = message.get("text");
  const timestamp = formatDateToTime(message.get("createdAt"));

  const sentByMe = () => {
    if (sender === currentUser.get("username")) {
      return true;
    }
    return false;
  };

  return (
    <div className="message" type={sentByMe() ? "sent" : "received"}>
      <div className="author">{sender}:</div>
      <div className="content" type={sentByMe() ? "sent" : "received"}>
          {content}  
      </div>
      <div className="timestamp">{timestamp}</div>
    </div>
  );
}
