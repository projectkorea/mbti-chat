import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useParams } from "react-router-dom";
import ChatBox from "components/chat/ChatBox.jsx";
import ChatForm from "components/chat/ChatForm.jsx";
import Inform from "components/chat/Inform.jsx";
import Navigation from "common/Navigation";
import { useUserStore } from "store/useStore.js";
import { MyBase } from "utils/myBase.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const ChatRoomPage = ({ colName, title }) => {
  // Set overscroll behavior inside useEffect with cleanup
  useEffect(() => {
    document.body.style.overscrollBehaviorY = "none";
    return () => {
      document.body.style.overscrollBehaviorY = "inherit";
    };
  }, []);

  const { user } = useUserStore();
  const [chats, setChats] = useState([]);

  const [topViewRef, inTopView] = useInView();
  const [bottomViewRef, inBottomView] = useInView();
  const containerRef = useRef(null);
  const [limitNum, setLimitNum] = useState(10);
  const [newMsg, setNewMsg] = useState(false);
  const [prevChatId, setPrevChatId] = useState("");

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo(0, 0, { behavior: "smooth" });
    }
  };

  const onUpdate = (chats) => {
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
        <Inform />
        <div className="chat-room" ref={containerRef}>
          {newMsg && (
            <div className="chat-room--new-msg" onClick={scrollToBottom}>
              <FontAwesomeIcon icon={faArrowDown} color={"#000000"} size="1x" />
            </div>
          )}
          {chats.map((chat, index) => {
            const chatBoxProps = {
              key: chat.id,
              chatObj: chat,
              isOwner: user && chat.creatorId === user.uid,
            };
            return index === 1 ? (
              <ChatBox {...chatBoxProps} ref={bottomViewRef} />
            ) : (
              <ChatBox {...chatBoxProps} />
            );
          })}
          <div ref={topViewRef} style={{ margin: "1px auto" }}></div>
        </div>
        <ChatForm />
      </div>
    </>
  );
};

export default ChatRoomPage;

ChatRoomPage.propTypes = {
  colName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
