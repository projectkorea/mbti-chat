import { useState, FormEvent } from "react";
import { db } from "utils/myBase.js";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "store/useStore.js";

const ChatRoomCreator = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const { user, isSignInWithEmail, typeChoose, canMakeRoom, setCanMakeRoom } = useUserStore();

  const onInspect = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!user) {
      alert("로그인 후 이용바랍니다.");
      return navigate("/login");
    }

    if (isSignInWithEmail && !user.emailVerified) {
      alert("이메일 인증 후 이용바랍니다.");
      return navigate("/profile");
    }

    if (!typeChoose) {
      alert("유형을 고르고 채팅하라능!");
      return navigate("/profile");
    }

    if (title === "") {
      return alert("제목을 입력해주세요");
    }

    // Title validation when already created room exists
    if (!canMakeRoom) {
      if (
        window.confirm(
          `이미 생성한 채팅방이 있습니다. '${title}'로 방 제목을 바꾸시겠습니까?`
        )
      ) {
        onSubmit(e, true);
      } else {
        e.preventDefault();
      }
    } else {
      onSubmit(e, true);
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>, pass: boolean): Promise<void> => {
    if (!pass) return;

    e.preventDefault();

    const roomObj = {
      createdAt: Date.now(),
      creatorId: user.uid,
      creatorType: user.displayName,
      title,
    };

    setTitle("");
    setCanMakeRoom(false);

    // Register the chat room in the database
    // @ts-expect-error - Firestore typing issue
    await db.collection("chat-room").doc(user.uid).set(roomObj);
  };

  return (
    <form onSubmit={onInspect}>
      <div className="chat-gen">
        <input
          className="chat-gen-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="채팅방 제목을 입력하세요"
          maxLength={30}
        />
        <input className="chat-gen-btn" type="submit" value="방 만들기" />
      </div>
    </form>
  );
};

export default ChatRoomCreator;
