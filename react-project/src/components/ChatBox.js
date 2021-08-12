import React from "react";
import MbtiBadge from "./MbtiBadge";

const ChatBox = ({ chatObj, isOwner }) => {
  return (
    <>
      <div className="chat-profile">
        <MbtiBadge mbtiType={chatObj.creatorType} />
        <span className="chat-id-font">{chatObj.creatorNickname}: </span>
      </div>
      <div className="chat-box">
        <div className="chat-text">
          <h4 className="chat-text-font">{chatObj.text}</h4>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
