import React from "react";
import { Link } from "react-router-dom";


/**
 * THIS IS OLD CODE FROM BACK WHEN WE HARD CODED STUFF
 *
 */

const ChatListGroupItem = (props) => {
  return (
    <Link to="/">
      <div className="chat-list-item-box">
        <div className="chat-list-group-item-img-box">
          <img className="chat-list-item-img" src={props.groupChat[0].image}  />
          <img className="chat-list-item-img" src={props.groupChat[1].image}  />
        </div>
        <div className="chat-list-item-info">
          <div className="chat-list-item-info-name">{props.groupChat[0].interest}</div>
          <div className="chat-list-item-info-language">
             {props.groupChat[0].TL}/ {props.groupChat[0].NL}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ChatListGroupItem;
 