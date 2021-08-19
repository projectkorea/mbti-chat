import { dbService } from "myBase";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const RoomGen = ({ userObj, typeChoose, canMakeRoom, setCanMakeRoom }) => {
  const history = useHistory();
  const [title, setTitle] = useState("");

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
          if (canMakeRoom) {
            if (title === "") {
              alert("제목을 입력해주세요");
              event.preventDefault();
            } else {
              onSubmit(event, true);
            }
          } else {
            if (title !== "") {
              if (
                window.confirm(
                  `이미 생성한 채팅방이 있습니다. '${title}'로 방 제목을 바꾸시겠습니까?`
                )
              ) {
                onSubmit(event, true);
              } else {
                event.preventDefault();
              }
            } else {
              alert("제목을 입력해주세요");
              event.preventDefault();
            }
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

      const roomObj = {
        createdAt: Date.now(),
        creatorId: userObj.uid,
        creatorType: userObj.displayName,
        title: title, //state value:chat}
      };

      setTitle("");
      setCanMakeRoom(false);

      //메시지 등록
      await dbService.collection("chat-room").doc(userObj.uid).set(roomObj);
    }
  };

  return (
    <form onSubmit={onInspect}>
      <div className="chat-gen">
        <input
          className="chat-gen-input"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          type="text"
          placeholder="채팅방 제목을 입력하세요"
          maxLength={30}
        />
        <input className="chat-gen-submit" type="submit" value="방 만들기" />
      </div>
    </form>
  );
};

export default RoomGen;
