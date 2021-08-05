import { dbService, countService } from "myBase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ChatGen = ({ userObj, signInEmail, typeInit }) => {
  const history = useHistory();
  const mbtiType = window.location.href.substring(
    window.location.href.lastIndexOf("/") + 1
  );
  const [chat, setChat] = useState("");
  const [chatCount, setChatCount] = useState(4);

  useEffect(() => {
    setInterval(() => setChatCount(4), 10000);
  }, []);

  const onSubmit = async (event) => {
    //로그인 했다면 채팅 가능하게
    if (userObj) {
      event.preventDefault();
      //11 통과 10 불통과 00 통과  01 통과
      if (signInEmail === true && userObj.emailVerified === false) {
        alert("이메일 인증 후 채팅하라능!");
        history.push("/profile");
        return;
      }
      //type을 골라야 채팅 가능하게
      if (!typeInit) {
        alert("유형을 고르고 채팅하라능!");
        history.push("/profile");
        return;
      }
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
        const date = new Date();
        //메세지 다큐먼트 생성
        await dbService.collection(`mbti-chat-${mbtiType}`).add({
          text: chat, //state value:chat
          createdAt: {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            hour: date.getHours(),
            minute: date.getMinutes(),
            second: date.getSeconds(),
          },
          creatorId: userObj.uid,
          creatorType: userObj.displayName,
          creatorNickname: userObj.photoURL,
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
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={chat}
          onChange={onChange}
          type="text"
          placeholder="채팅을 입력하세요"
          maxLength={120}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
    </form>
  );
};

export default ChatGen;
