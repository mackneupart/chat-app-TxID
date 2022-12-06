import Message from "../Message/Message";
import React, { useEffect, useState } from "react";
import { useParseQuery } from "@parse/react";
import Parse from "parse";
import "./ChatBox.css";

export default function ChatBox({ currentUser, otherUser }) {
  const [messageInput, setMessageInput] = useState("");

  const parseQuery = new Parse.Query("Message");
  parseQuery.containedIn("sender", [currentUser.id, otherUser.id]);
  parseQuery.containedIn("receiver", [currentUser.id, otherUser.id]);

  parseQuery.ascending("createdAt");
  parseQuery.includeAll();

  // Declare hook and variables to hold hook responses
  const { isLive, isLoading, isSyncing, results, count, error, reload } =
    useParseQuery(parseQuery, {
      enableLocalDatastore: true, // Enables cache in local datastore (default: true)
      enableLiveQuery: true, // Enables live query for real-time update (default: true)
    });

  // Message sender handler
  const sendMessage = async () => {
    try {
      const messageText = messageInput;

      if (messageText !== "") {
        let Message = new Parse.Object("Message");
        console.log("Message");
        Message.set("text", messageText);
        Message.set("sender", currentUser);
        Message.set("receiver", otherUser);
        Message.save();
        console.log("is live: " + isLive);
        console.log("results: ", results);
        setMessageInput("");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="chat-box">
      {results && (
        <div className="message-list">
          {results
            .sort((a, b) => a.get("createdAt") > b.get("createdAt"))
            .map((result) => (
              <div
                key={result.id}
                className={
                  result.get("sender").id === currentUser.id
                    ? "message_sent"
                    : "message_received"
                }
              >
                <Message message={result} currentUser={currentUser} />
              </div>
            ))}
        </div>
      )}
      <div className="new_message">
        <h2 className="new_message_title">New message</h2>
        <input
          className="form_input"
          value={messageInput}
          onChange={(event) => setMessageInput(event.target.value)}
          placeholder={"Your message..."}
          size="large"
        />
        <button
          type="primary"
          className="form_button"
          color={"#208AEC"}
          size={"large"}
          onClick={sendMessage}
        >
          Send message
        </button>
      </div>
      <div>
        {isLoading && <p>{"Loading…"}</p>}
        {isSyncing && <p>{"Syncing…"}</p>}
        {isLive ? <p>{"Status: Live"}</p> : <p>{"Status: Offline"}</p>}
        {error && <p>{error.message}</p>}
        {count && <p>{`Count: ${count}`}</p>}
      </div>
    </div>
  );
}
