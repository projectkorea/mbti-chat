import React, { useEffect, useState } from "react";
import { dbService } from "myBase";
import ChatBox from "components/ChatBox";
import ChatGen from "components/ChatGen";

const Chat = ({ userObj, typeChoose }) => {
  const url = window.location.href;
  const mbtiType = url.substring(url.lastIndexOf("/") + 1);
  const [chats, setChats] = useState([]);

  //chatbox에 줄 정보 불러오기
  useEffect(() => {
    dbService
      .collection(`mbti-chat-${mbtiType}`)
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const chatArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChats(chatArray);
      });
  }, []);

  return (
    <div className="chat-container">
      {userObj ? (
        //로그인 한 상태라면
        <>
          <ChatGen userObj={userObj} typeChoose={typeChoose} />
          {chats.map((chat) => (
            <ChatBox
              key={chat.id}
              chatObj={chat}
              isOwner={chat.creatorId === userObj.uid}
            />
          ))}
        </>
      ) : (
        <>
          {chats.map((chat) => (
            <ChatBox key={chat.id} chatObj={chat} />
          ))}
          <ChatGen />
        </>
      )}
    </div>
  );
};

export default Chat;
