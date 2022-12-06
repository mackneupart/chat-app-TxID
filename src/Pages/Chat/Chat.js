import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { ReadCurrentUser, getCurrentUserId } from "../../API/API";
import { getRandomUser } from "../../API/API";
import { useParseQuery } from "@parse/react";
import Parse from "parse";

export const Chat = () => {
  const { state } = useLocation();
  const currentUser = state.currentUser;
  const randomUser = state.randomUser;
  //const sender = Parse.User.current().id; // should fetch from API function getCurrentUser or similar, but does not work atm
  const sender = currentUser.id;
  //const receiver = "1cUWOIKpQq"; // should fetch from API function, but does not work atm
  const receiver = randomUser.id;
  const navigate = useNavigate();
  const [messageInput, setMessageInput] = useState("");

  const parseQuery = new Parse.Query("Message");
  parseQuery.containedIn("sender", [sender, receiver]);
  parseQuery.containedIn("receiver", [sender, receiver]);

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

      // Get sender and receiver nickname Parse objects
      /*   const senderQuery = new Parse.Query("User");
      senderQuery.equalTo("objectId", sender);
      let senderObject = await senderQuery.first();
    

      const receiverQuery = new Parse.Query("User");
      receiverQuery.equalTo("objectId", receiver);
      let receiverObject = await receiverQuery.first();
 */

      if (messageText !== "") {
        // Create new Message object and save it
        let Message = new Parse.Object("Message");
        console.log("Message");
        Message.set("text", messageText);
        //Message.set("sender", senderObject);
        //Message.set("receiver", receiverObject);
        Message.set("sender", currentUser);
        Message.set("receiver", randomUser);
        Message.save();
        console.log("is live: " + isLive);
        console.log("results: ", results);
        setMessageInput("");
      }
    } catch (error) {
      alert(error);
    }
  };

  // Helper to format createdAt value on Message
  const formatDateToTime = (date) => {
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  };

  //const senderName = Parse.User.current().get("username"); // should be deleted when fetching names from API in lines below :-)
  return (
    <div>
      <div className="flex_between">
        <h2 className="list_heading">{`${currentUser.get(
          "username"
        )} sending, ${randomUser.get("username")} receiving!`}</h2>
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
                  {result.get("sender").get("username")}
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
};
