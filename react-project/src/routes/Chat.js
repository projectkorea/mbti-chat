import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { dbService } from "myBase";
import ChatBox from "components/ChatBox";
import ChatGen from "components/ChatGen";
import Inform from "components/Inform";

const Chat = ({ userObj, typeChoose }) => {
  document.body.style.overscrollBehaviorY = "none";
  const url = window.location.href;
  const mbtiType = url.substring(url.lastIndexOf("/") + 1);
  const [chats, setChats] = useState([]);

  //infinite loader
  const [loaderRef, inView] = useInView();
  //limit variable for fiebase: number of dowcument
  const [limitNum, setLimitNum] = useState(10);

  //chatbox에 줄 정보 불러오기
  // 로딩될 때 chat box가 리로딩 되려면 이 hooks를 실행해야함
  useEffect(() => {
    setLimitNum(limitNum + 5);
    dbService
      .collection(`mbti-chat-${mbtiType}`)
      .orderBy("createdAt", "desc")
      .limit(limitNum)
      .onSnapshot((snapshot) => {
        const chatArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChats(chatArray);
      });
    return () => {
      document.body.style.overscrollBehaviorY = "inherit";
    };
  }, [inView]);

  return (
    <div className="chat-container">
      {userObj ? (
        //로그인 O
        <>
          {/* 채팅방 스크롤 밑으로 내리기, column리버스 유의 */}
          <div className="chat-room">
            {/* <Inform /> */}
            {chats.map((chat) => (
              <ChatBox
                key={chat.id}
                chatObj={chat}
                isOwner={chat.creatorId === userObj.uid}
              />
            ))}
            <div ref={loaderRef} style={{ margin: "0px auto" }}></div>
          </div>
          <ChatGen userObj={userObj} typeChoose={typeChoose} />
        </>
      ) : (
        //로그인 X
        <>
          <div className="chat-room">
            {/* <Inform /> */}
            {chats.map((chat) => (
              <ChatBox key={chat.id} chatObj={chat} />
            ))}
            <div ref={loaderRef} style={{ margin: "0px auto" }}></div>
          </div>
          <ChatGen />
        </>
      )}
    </div>
  );
};

export default Chat;
