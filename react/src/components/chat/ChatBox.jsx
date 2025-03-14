import { forwardRef } from "react";
import MbtiBadge from "common/MbtiBadge";
import PropTypes from "prop-types";

const ChatBox = forwardRef(({ chatObj, isOwner }, ref) => {
  return (
    <>
      {isOwner ? (
        <div className="chat-wrap--my" ref={ref}>
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
        <div className="chat-wrap" ref={ref}>
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
});

ChatBox.propTypes = {
  chatObj: PropTypes.object.isRequired,
  isOwner: PropTypes.bool,
};

ChatBox.displayName = "ChatBox";

export default ChatBox;
