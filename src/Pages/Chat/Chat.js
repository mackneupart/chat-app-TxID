import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Chat() {
  const navigate = useNavigate();
  console.log("render");

  function goBack() {
    navigate("/Home");
  }
  return (
    <div className="Chat">
      <img src="./Icons/home-icon.png" width="35px" onClick={goBack} />
      <button onClick={goBack}>Return</button>
      <div className="user-box">
        <input type="text"></input>
      </div>
    </div>
  );
}