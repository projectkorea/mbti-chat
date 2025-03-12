import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import ChatBox from "chat/ChatBox.jsx";
import ChatForm from "chat/ChatForm.jsx";
import Inform from "components/chat/Inform.jsx";
import Navigation from "common/Navigation";
import { useUserStore } from "store/useStore.js";
import { MyBase } from "../../utils/myBase.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import PropType from "prop-types";

const ChatRoomPage = ({ colName, title }) => {
  // 위로 스크롤 했을 때 새로고침 방지용, 바운스 버그도 제거
  document.body.style.overscrollBehaviorY = "none";

  const { user } = useUserStore();
  const [chats, setChats] = useState([]);

  const [topViewRef, inTopView] = useInView();
  const [bottomViewRef, inBottomView] = useInView();
  const containerRef = useRef(null);
  const [limitNum, setLimitNum] = useState(10);
  const [newMsg, setNewMsg] = useState(false);
  const [prevChatId, setPrevChatId] = useState("");

  const scrollToBottom = () => {
    containerRef.current.scrollTo(0, 0, { behavior: "smooth" });
  };

  const onUpdate = (chats) => {
    setChats(chats);
  };

  useEffect(() => {
    const unsubscribe = MyBase.onChat(colName, limitNum, onUpdate);
    return () => unsubscribe();
  }, [limitNum]);

  useEffect(() => {
    setLimitNum((prevNum) => prevNum + 5);
  }, [inTopView]);

  useEffect(() => {
    const currentChatId = chats[0]?.id;
    const isNewChat = prevChatId !== currentChatId;

    if (!inBottomView && isNewChat) {
      setNewMsg(true);
      setPrevChatId(chats[0]?.id);
    } else if (!isNewChat || inBottomView) {
      setNewMsg(false);
    }
    return () => {
      document.body.style.overscrollBehaviorY = "inherit";
    };
  }, [chats, inBottomView]);

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
  colName: PropType.string.isRequired,
  title: PropType.string.isRequired,
};
