import { dbService, countService } from "myBase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ChatGen = ({ userObj, typeChoose }) => {
  const url = window.location.href;
  const mbtiType = url.substring(url.lastIndexOf("/") + 1);
  const msgNumber = mbtiType + "-msg";
  const history = useHistory();
  const [chat, setChat] = useState("");
  const [chatCount, setChatCount] = useState(4);

  useEffect(() => {
    setInterval(() => setChatCount(4), 10000);
  }, []);

  const onInspect = (event) => {
    if (userObj) {
      // 00 통과  01 통과 11 통과 10 불통과
      if (
        !(
          userObj.providerData[0]["uid"].indexOf("@") !== -1 &&
          userObj.emailVerified === false
        )
      ) {
        //로그인 여부 확인 끝
        //타입 선택여부
        if (typeChoose) {
          //채팅검열시작
          if (chat === "") {
            alert("입력하라능!");
            event.preventDefault();
          } else if (chatCount <= 0) {
            alert("도배하지말라능!");
            event.preventDefault();
          } else {
            onSubmit(event, true);
          }
        } else {
          alert("유형을 고르고 채팅하라능!");
          history.push("/profile");
        }
      } else {
        alert("이메일 인증 후 이용바랍니다.");
        history.push("/profile");
      }
    } else {
      alert("로그인 후 이용바랍니다.");
      history.push("/login");
    }
  };

  const onSubmit = async (event, pass) => {
    if (pass) {
      event.preventDefault();
      const chatObj = {
        createdAt: Date.now(),
        creatorType: userObj.displayName,
        creatorNickname: userObj.photoURL,
        text: chat, //state value:chat}
      };
      //발언권 -1
      setChatCount(chatCount - 1);
      setChat("");
      //메시지 등록
      console.log(chatObj);
      await dbService.collection(`mbti-chat-${mbtiType}`).add(chatObj);

      //메시지 개수 업데이트
      await dbService
        .collection("info")
        .doc("w7wZ15buqtjglLIpYMjx")
        .update({
          [msgNumber]: countService.FieldValue.increment(1),
        });
    }
  };

  return (
    <form onSubmit={onInspect}>
      <div>
        <input
          value={chat}
          onChange={(event) => setChat(event.target.value)}
          type="text"
          placeholder="채팅을 입력하세요"
          maxLength={120}
        />
        <input type="submit" value="&rarr;" />
      </div>
    </form>
  );
};

export default ChatGen;
