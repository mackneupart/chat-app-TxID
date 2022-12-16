import Message from "../Message/Message";
import Button from "../Button/Button";
import "./ChatBox.css";
import useLiveMessages from "../../Hooks/useLiveMessages";
import { getCurrentUser } from "../../API/API";

export default function ChatBox({ chat }) {
  const { messageInput, handle, status, messages, count, error, reload } =
    useLiveMessages(chat);

  return (
    <div className="chat-box">
      <div className="threat">
        {messages && (
          <div className="message-list">
            {messages
              .sort((a, b) => a.get("createdAt") > b.get("createdAt"))
              .map((message) => (
                <div
                  key={message.id}
                  className={
                    message.get("sender").id === getCurrentUser().id
                      ? "message_sent"
                      : "message_received"
                  }
                >
                  <Message message={message} />
                </div>
              ))}
          </div>
        )}
      </div>

      <div className="sending-messages">
        <form className="input-form" action="/form/submit" method="GET">
          <textarea
            className="input-area"
            cols="60"
            rows="5"
            value={messageInput}
            onChange={handle.change}
            placeholder={"Your message..."}
          ></textarea>
        </form>

        <Button className="send-btn" text="Send" click={handle.send} />
        <div className="server-info">
          {status.isLoading && <p>{"Loading…"}</p>}
          {status.isSyncing && <p>{"Syncing…"}</p>}
          {status.isLive ? <p>{"Status: Live"}</p> : <p>{"Status: Offline"}</p>}
          {error && <p>{error.message}</p>}
          {count && <p>{`Count: ${count}`}</p>}
        </div>
      </div>
    </div>
  );
}
