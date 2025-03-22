import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import ChatMessage from "src/components/chat/ChatMessage.js";
import ChatInput from "src/components/chat/ChatInput.jsx";
import ChatHeader from "src/components/chat/ChatHeader.jsx";
import Navigation from "common/Navigation";
import { useUserStore } from "store/useStore.js";
import { MyBase } from "utils/myBase.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import Footer from "common/Footer";
interface ChatRoomPageProps {
  colName: string;
  title: string;
}

interface ChatData {
  id: string;
  creatorId: string;
  clock: string;
  text: string;
  creatorType: string;
  creatorNickname: string;
  [key: string]: string | number | boolean; // More specific index signature
}

const ChatRoomPage = ({ colName, title }: ChatRoomPageProps) => {
  // Set overscroll behavior inside useEffect with cleanup
  useEffect(() => {
    document.body.style.overscrollBehaviorY = "none";
    return () => {
      document.body.style.overscrollBehaviorY = "inherit";
    };
  }, []);

  const { user } = useUserStore();
  const [chats, setChats] = useState<ChatData[]>([]);

  const [topViewRef, inTopView] = useInView();
  const [bottomViewRef, inBottomView] = useInView();
  const containerRef = useRef<HTMLDivElement>(null);
  const [limitNum, setLimitNum] = useState(10);
  const [newMsg, setNewMsg] = useState(false);
  const [prevChatId, setPrevChatId] = useState("");

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo(0, 0);
    }
  };

  const onUpdate = (chats: ChatData[]) => {
    if (Array.isArray(chats)) {
      setChats(chats);
    }
  };

  useEffect(() => {
    const unsubscribe = MyBase.onChat(colName, limitNum, onUpdate);
    return () => unsubscribe();
  }, [limitNum, colName]);

  useEffect(() => {
    setLimitNum((prevNum) => prevNum + 5);
  }, [inTopView]);

  useEffect(() => {
    if (!chats.length) return;
    
    const currentChatId = chats[0]?.id;
    const isNewChat = prevChatId !== currentChatId;

    if (!inBottomView && isNewChat) {
      setNewMsg(true);
      setPrevChatId(chats[0]?.id);
    } else if (!isNewChat || inBottomView) {
      setNewMsg(false);
    }
  }, [chats, inBottomView, prevChatId]);

  return (
    <>
      <Navigation />
      <div className="chat-container">
        <h1 className="chat-room-title">{title + "채팅방"}</h1>
        <ChatHeader />
        <div className="chat-room" ref={containerRef}>
          {newMsg && (
            <div className="chat-room--new-msg" onClick={scrollToBottom}>
              <FontAwesomeIcon icon={faArrowDown} color={"#000000"} size="1x" />
            </div>
          )}
          {chats.map((chat, index) => {
            const ChatMessageProps = {
              key: chat.id,
              chatObj: chat,
              // @ts-expect-error - user is not null
              isOwner: user && chat.creatorId === user.uid,
            };
            return index === 1 ? (
              <ChatMessage {...ChatMessageProps} observerRef={bottomViewRef} />
            ) : (
              <ChatMessage {...ChatMessageProps} />
            );
          })}
          <div ref={topViewRef} style={{ margin: "1px auto" }}></div>
        </div>
        <ChatInput />
      </div>
      <Footer />
    </>
  );
};

export default ChatRoomPage;
