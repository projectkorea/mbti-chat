import { dbService, countService } from "myBase";
import React, { useEffect, useState } from "react";

const ChatGen = ({ userObj }) => {
  const mbtiType = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );
  const [chat, setChat] = useState("");
  const [chatCount, setChatCount] = useState(3);

  useEffect(() => {
    setInterval(() => setChatCount(3), 6000);
  }, []);

  const onSubmit = async (event) => {
    if (userObj) {
      event.preventDefault();

      //채팅검열
      if (chat === "") {
        alert("입력하라능!");
        return;
      } else if (chatCount <= 0) {
        alert("도배하지말라능!");
        return;
      } else {
        //업데이트 될 때 까지 기다리고 비우면 일종의 딜레이 착시현상 발생
        setChat("");

        //메세지 다큐먼트 생성
        await dbService.collection(`mbti-chat-${mbtiType}`).add({
          text: chat, //state value:chat
          createdAt: Date.now(),
          creatorId: userObj.uid,
        });

        //발언권 -1
        setChatCount(chatCount - 1);

        //FIRESTORE COUNT DOCUMENT 업데이트
        await dbService
          .collection("mbti-chat-count")
          .doc("U4cBg755pLzeo5Mi8BMe")
          .update({
            [mbtiType]: countService.FieldValue.increment(1),
          });
      }
    } else {
      alert("로그인 후 이용바랍니다.");
      event.preventDefault();
    }
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setChat(value);
  };

  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <h1>{chatCount}</h1>
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={chat}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
    </form>
  );
};

export default ChatGen;
