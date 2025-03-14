import { useEffect, useState } from "react";
import MbtiBadge from "common/MbtiBadge";
import { useUserStore } from "store/useStore.js";
import { useNavigate } from "react-router-dom";
import { MyBase } from "utils/myBase.js";

const ChatForm = () => {
  const [chat, setChat] = useState("");
  const [chatCount, setChatCount] = useState(4);
  const { user, isSignInWithEmail, typeChoose } = useUserStore();
  const navigate = useNavigate();

  const url = window.location.href;
  const pathSegment = url.substring(url.lastIndexOf("/") + 1);
  const colName = pathSegment === "chat" ? "all" : pathSegment;

  useEffect(() => {
    const preventOverChat = setInterval(() => setChatCount(4), 10000);
    return () => clearInterval(preventOverChat);
  }, [user, isSignInWithEmail]);

  const showAlertAndNavigate = (msg, path) => {
    alert(msg);
    navigate(path);
  };

  const onInspect = (e) => {
    e.preventDefault();

    if (!user) {
      return showAlertAndNavigate("로그인 후 이용바랍니다.", "/login");
    }

    if (isSignInWithEmail && !user.emailVerified) {
      return showAlertAndNavigate("이메일 인증 후 이용바랍니다.", "/profile");
    }

    if (!typeChoose) {
      return showAlertAndNavigate("유형을 고르고 채팅하라능!", "/profile");
    }

    if (chat === "") {
      return alert("입력하라능!");
    }

    if (chatCount <= 0) {
      return alert("도배하지말라능!");
    }

    onSubmit(e, true);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const dateNow = new Date();
    const hh = dateNow.getHours().toString().padStart(2, "0");
    const mm = dateNow.getMinutes().toString().padStart(2, "0");
    const hhmm = `${hh}:${mm}`;

    const chatObj = {
      createdAt: Date.now(),
      creatorId: user.uid,
      creatorType: user.displayName,
      creatorNickname: user.photoURL,
      clock: hhmm,
      text: chat,
    };

    setChatCount((prevCount) => prevCount - 1);
    setChat("");

    await MyBase.addChat(colName, chatObj);
    await MyBase.increaseCount("msg", user.displayName);

    // Update chat-room collection
    // if (colName.length > 5) {
    //   await db.collection("chat-room").doc(mbtiType).update({
    //     createdAt: Date.now(),
    //   });
    // }
  };

  return (
    <form onSubmit={onInspect}>
      {typeChoose && (
        <div className="chat-my-profile">
          <MbtiBadge mbtiType={user.displayName} />
          <span className="chat-id-font">{user.photoURL}</span>
        </div>
      )}
      <div className="chat-gen">
        <input
          className="chat-gen-input"
          value={chat}
          onChange={(e) => setChat(e.target.value)}
          type="text"
          placeholder="채팅을 입력하세요"
          maxLength={120}
        />
        <input className="chat-gen-btn" type="submit" value="전송" />
      </div>
    </form>
  );
};

export default ChatForm;
