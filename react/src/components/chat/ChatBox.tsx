import MbtiBadge from "common/MbtiBadge";

interface ChatObject {
  clock: string;
  text: string;
  creatorType: string;
  creatorNickname: string;
}

interface ChatBoxProps {
  chatObj: ChatObject;
  isOwner: boolean;
  observerRef?: React.RefObject<HTMLDivElement> | ((node?: Element | null) => void);
}

function ChatBox({ chatObj, isOwner, observerRef }: ChatBoxProps) {
  if (!chatObj) return null;
  
  return (
    <>
      {isOwner ? (
        <div className="chat-wrap--my" ref={observerRef}>
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
        <div className="chat-wrap" ref={observerRef}>
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
}

export default ChatBox;
