import Parse from "parse";
import { useParseQuery } from "@parse/react";
import { useState } from "react";
import { sendMessage } from "../API/API";

const useLiveMessages = (chat) => {
  const [messageInput, setMessageInput] = useState("");

  const handleSend = async () => {
    try {
      const messageText = messageInput;
      if (messageText !== "") {
        await sendMessage(messageText, chat);
        setMessageInput("");
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleChange = (event) => {
    setMessageInput(event.target.value);
  };

  const parseQuery = new Parse.Query("Message");
  /* parseQuery.containedIn("sender", [getCurrentUser(), otherUser.id]);
  parseQuery.containedIn("receiver", [getCurrentUser(), otherUser.id]); */
  parseQuery.equalTo("chat", chat)
  parseQuery.include("chat");
  parseQuery.ascending("createdAt");
  //parseQuery.includeAll();

  const { isLive, isLoading, isSyncing, results, count, error, reload } =
    useParseQuery(parseQuery, {
      enableLocalDatastore: true, // Enables cache in local datastore (default: true)
      enableLiveQuery: true, // Enables live query for real-time update (default: true)
    });

  console.log(chat.id);
  console.log(results);

  const messages = results;

  return {
    messages,
    messageInput,
    handle: { send: handleSend, change: handleChange },
    status: { isLive, isLoading, isSyncing },
    count,
    error,
    reload,
  };
};

export default useLiveMessages;
