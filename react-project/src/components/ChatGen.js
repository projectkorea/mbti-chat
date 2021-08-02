import { dbService } from "myBase";
import React, { useState } from "react";

const ChatGen = ({ userObj }) => {
  const mbtiType = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );
  const countField = `${mbtiType}-count`;
  const [chat, setChat] = useState("");
  const [chatCount, setChatCount] = useState(0);

  const checkOverChat = () => {
    if (chatCount >= 5) {
      alert("채팅방 도배가 감지되었습니다. 잠시후에 채팅해주세요.");
      setTimeout(() => {
        setChatCount(0);
      }, 5000);
      return "overChat";
    }
  };

  const inspector = () => {
    if (chat === "") {
      return "noChat";
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (inspector() === "noChat") {
      return;
    } else if (checkOverChat() === "overChat") {
      return;
    } else {
      //메세지 다큐먼트 생성
      await dbService.collection(`mbti-chat-${mbtiType}`).add({
        text: chat, //state value:chat
        createdAt: Date.now(),
        creatorId: userObj.uid,
      });
      //카운트 다큐먼트 업데이트
      await dbService
        .collection("mbti-chat-count")
        .doc("U4cBg755pLzeo5Mi8BMe")
        .update({
          countField: dbService.FieldValue.increment(1),
        });

      setChat("");
      setChatCount(chatCount + 1);
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
