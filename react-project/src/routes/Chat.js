import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { dbService } from "myBase";
import ChatBox from "components/ChatBox";
import ChatGen from "components/ChatGen";
import { useLocation } from "react-router-dom";

const Chat = ({ userObj, typeChoose }) => {
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
  const [limitNum, setLimitNum] = useState(10);
  //   const [msgRef, inViewMsg] = useInView();

  // 스크롤 이동
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  //채팅방 알림
  //   const [newDate, setNewDate] = useState(Date.now());
  //   const [newMsg, setNewMsg] = useState();

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
  }, []);

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
        scrollToBottom();
      });

    return () => {
      document.body.style.overscrollBehaviorY = "inherit";
    };
    //[inView]: 스크롤을 가장 위에 올렸을 때 inview값이 달라지며, chatBox를 리로드함
  }, [inView]);

  //메세지 알림 기능: 가장 최근 메세지(limit(1))가 현재 시간(컴포넌트 랜더링 시간 기준)보다 크다면
  //   useEffect(() => {
  //     if (inViewMsg.toString()) {
  //       dbService
  //         .collection(`mbti-chat-${mbtiType}`)
  //         .where("createdAt", ">", newDate)
  //         .limit(1)
  //         .onSnapshot((snapshot) => {
  //           snapshot.docs.map((doc) => console.log(doc.data().createdAt));
  //         });
  //     }
  //     return () => {
  //       setNewDate(Date.now());
  //     };
  //   }, [inViewMsg]);

  return (
    <>
      {/* user가 로그인 상태일 때만 주는 값은 userObj&&로 표현 */}
      <div className="chat-container">
        <h1 className="chat-room-title">{chatTitle}</h1>
        {/* {inViewMsg.toString()} */}
        <div className="chat-room">
          <div className="fake-div">
            <div ref={messagesEndRef}>ㅤ</div>
            {/* <div ref={msgRef} style={{ margin: "0px auto" }}> */}ㅤ
          </div>
          {/* </div> */}
          {/* <Inform /> */}
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
        />
      </div>
    </>
  );
};

export default Chat;
