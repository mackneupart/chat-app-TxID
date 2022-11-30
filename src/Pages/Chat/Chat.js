import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ReadCurrentUser, getCurrentUserId } from "../../API/API";
import { getRandomUser } from "../../API/API";
import { useParseQuery } from "@parse/react";
import Parse from "parse";


export default function Chat() {
  const navigate = useNavigate();
  
  const [messageInput, setMessageInput] = useState("");
  const sender = Parse.User.current().id;
  const receiver = "PovaKwMIdJ";

  const parseQuery = new Parse.Query("Message");
  parseQuery.containedIn("sender", [
    sender,
    receiver,
  ]);
  parseQuery.containedIn("receiver", [
    sender,
    receiver,
  ]);

  parseQuery.ascending("createdAt");
  parseQuery.includeAll();


  function goBack() {
    navigate("/Home");
  }

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

      // Get sender and receiver nickname Parse objects
    const senderQuery = new Parse.Query("User");
    senderQuery.equalTo("objectId", sender);
    let senderObject = await senderQuery.first();
      
    const receiverQuery = new Parse.Query("User");
    receiverQuery.equalTo("objectId", receiver);
    let receiverObject = await receiverQuery.first();

      // Create new Message object and save it
      let Message = new Parse.Object("Message");
      console.log("Message");
      Message.set("text", messageText);
      Message.set("sender", senderObject);
      Message.set("receiver", receiverObject);
      Message.save();
      console.log("is live: " + isLive);
      console.log("results: ", results);
      // Clear input
      setMessageInput("");
    } catch (error) {
      alert(error);
    }
  };

  // Helper to format createdAt value on Message
  const formatDateToTime = (date) => {
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  };


  const senderName = Parse.User.current().get("username");
  return (
    <div>
      <div className="flex_between">
        <h2 className="list_heading">{`${senderName} sending, ${receiver} receiving!`}</h2>
      </div>
      {results && (
        <div className="messages">
          {results
            .sort((a, b) => a.get("createdAt") > b.get("createdAt"))
            .map((result) => (
              <div
                key={result.id}
                className={
                  result.get("sender").id === sender
                    ? "message_sent"
                    : "message_received"
                }
              >
                <p className="message_bubble">{result.get("text")}</p>
                <p className="message_time">
                  {formatDateToTime(result.get("createdAt"))}
                </p>
                <p className="message_name">
                  {result.get("sender").get("name")}
                </p>
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