import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import ChatBox from "../../Components/ChatBox/ChatBox";

export const Chat = () => {
  const { state } = useLocation();
  const currentUser = state.currentUser;
  const otherUser = state.otherUser;
  //const navigate = useNavigate();

  return (
    <div>
      <div className="flex_between">
        <h2 className="list_heading">{`${currentUser.get(
          "username"
        )} sending, ${otherUser.get("username")} receiving!`}</h2>
      </div>

      <ChatBox currentUser={currentUser} otherUser={otherUser} />
    </div>
  );
};
