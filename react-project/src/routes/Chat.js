import React, { useEffect, useState } from "react";
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
      });

    //클린함수
    return () => {
      document.body.style.overscrollBehaviorY = "inherit";
    };
  }, [inView]);

  return (
    <>
      {/* user가 로그인 상태일 때만 주는 값은 userObj&&로 표현 */}
      <div className="chat-container">
        <h1 className="chat-room-title">{chatTitle}</h1>
        <div className="chat-room">
          {/* <Inform /> */}
          {chats.map((chat) => (
            <ChatBox
              key={chat.id}
              chatObj={chat}
              isOwner={userObj && chat.creatorId === userObj.uid}
            />
          ))}
          <div ref={loaderRef} style={{ margin: "0px auto" }}></div>
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
