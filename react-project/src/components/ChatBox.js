import React from "react";
import MbtiBadge from "./MbtiBadge";

const ChatBox = ({ chatObj, isOwner }) => {
  return (
    <>
      {isOwner ? (
        <div className="chat-wrap--my">
          <div className="chat-box--my">
            <span className="chat-text-clock">{chatObj.clock}</span>
            <div className="chat-text--my">
              <span className="chat-text-font">{chatObj.text}</span>
            </div>
          </div>
          {!isOwner && (
            <div className="chat-profile">
              <MbtiBadge mbtiType={chatObj.creatorType} />
              <span className="chat-id-font">{chatObj.creatorNickname}: </span>
            </div>
          )}
        </div>
      ) : (
        <div className="chat-wrap">
          <div className="chat-box">
            <div className="chat-text">
              <span className="chat-text-font">{chatObj.text}</span>
            </div>
            <span className="chat-text-clock">{chatObj.clock}</span>
          </div>
          <div className="chat-profile">
            <MbtiBadge mbtiType={chatObj.creatorType} />
            <span className="chat-id-font">{chatObj.creatorNickname}: </span>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBox;
