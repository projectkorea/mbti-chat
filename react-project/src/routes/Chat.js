import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { dbService } from "myBase";
import ChatBox from "components/ChatBox";
import ChatGen from "components/ChatGen";
import { useLocation } from "react-router-dom";
import Inform from "components/Inform";

const Chat = ({ userObj, typeChoose, isSignInEmail }) => {
  //이전 채팅을 보기 위해 위로 스크롤 했을 때 새로고침 방지용, 바운스 효과도 없어짐
  document.body.style.overscrollBehaviorY = "none";

  //채팅방 제목 불러오기
  const location = useLocation();

  const url = window.location.href;
  const mbtiType = url.substring(url.lastIndexOf("/") + 1);
  const [chats, setChats] = useState([]);
  const [chatTitle, setChatTitle] = useState("전체 채팅방");

  //infinite loader
  const [loaderRef, inView] = useInView();
  const [limitNum, setLimitNum] = useState(30);
  const [scrollOn, setScrollOn] = useState(true);
  //   const [msgRef, inViewMsg] = useInView();

  // 스크롤 이동
  const containerRef = useRef(null);
  const scrollToBottom = () => {
    containerRef.current.scrollTo(0, 0, { behavior: "smooth" });
  };

  //채팅방 제목 불러오기
  useEffect(() => {
    if (mbtiType) {
      if (mbtiType.length > 5) {
        const { title } = location.state;
        setChatTitle(`${title}`);
      } else {
        //유형별 채팅방
        setChatTitle(`${mbtiType.toUpperCase()} 채팅방 `);
      }
    } else return; //전체 채팅방
  }, [location, mbtiType]);

  //chatbox에 줄 정보 불러오기
  // 로딩될 때 chat box가 리로딩 되려면 이 hooks를 실행해야함
  useEffect(() => {
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
        // console.log(scrollOn);
        //useRef null방지용
        if (containerRef.current) {
          if (scrollOn) scrollToBottom();
        }
        //div element가 넣어지기 전에 current.scrollTo 함수 실행하면 null오류 발생 방지
        //위로 올렸을 때 내려가지 않고, snapshot이 바뀌었을 때(=새로운 채팅이 발생했을 때)만 내려가게
      });
    return () => {
      //unmounted componet error 방지
      setChats([]);
      document.body.style.overscrollBehaviorY = "inherit";
    };
    //스크롤을 가장 위에 올렸을 때 inview값이 달라지며, chatBox를 리로드함
  }, [limitNum]);

  useEffect(() => {
    setLimitNum(limitNum + 5);
    setScrollOn(false);
  }, [inView]);

  return (
    <>
      <div className="chat-container">
        <h1 className="chat-room-title">{chatTitle}</h1>
        <Inform />
        <div className="chat-room" ref={containerRef}>
          {chats.map((chat) => (
            <ChatBox
              key={chat.id}
              chatObj={chat}
              isOwner={userObj && chat.creatorId === userObj.uid}
            />
          ))}
          <div ref={loaderRef} style={{ margin: "0px auto" }}>
            ㅤㅤ
          </div>
        </div>
        <ChatGen
          userObj={userObj && userObj}
          typeChoose={userObj && typeChoose}
          isSignInEmail={userObj && isSignInEmail}
        />
      </div>
    </>
  );
};

export default Chat;
