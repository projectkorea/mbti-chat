import { db } from "utils/myBase.js";
import { useEffect, useState } from "react";

function AboutDeveloperPage() {
  const [chat, setChat] = useState("");

  const onSubmit = async (event: React.FormEvent) => {
    if (chat !== "") {
      event.preventDefault();
      const qnaObj = {
        createdAt: new Date(),
        text: chat, //state value:chat}
      };
      // @ts-expect-error - 타입 추론 문제
      await db.collection(`qna`).add(qnaObj);
      setChat("");
      alert("소중한 의견 감사합니다.");
    } else {
      event.preventDefault();
      alert("의견을 입력해주세요");
    }
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <div
        className="flex flex-col justify-center items-center mx-auto mt-[50px] w-[350px] p-[10px] bg-white rounded-[10px] font-['NanumBarunGothic'] leading-[1.5]"
      >
        <div className="notice">
          <h1>안녕하세요.</h1>
          <h1>'유유상종' 개발자, ProjectKorea입니다.</h1>
          <br></br>
          <h1>
            나와 비슷한 사람과 얘기가 통할 때 '대화의 갈증'이 해소되신 적이
            있으신가요? 소소한 행복이죠.
          </h1>
          <br></br>
          <h1>
            친해지고 싶은 사람이 생겼는데, 방법을 모른다면요? 그 사람의 MBTI
            유형을 아는 것만으로 대화의 폭이 다양해질 거예요.
          </h1>
          <br></br>
          <h1>
            MBTI 유형만으로 '소소한 일상부터 다양한 주제까지' 간편하게 대화하는
            서비스가 있었으면 좋겠다는 생각 하나로 개발하게 되었습니다.
            <br></br>
          </h1>
          <br></br>
          <h1>
            추가기능은 계속 개발 중입니다. 로그인 오류, 버그, 추가기능 의견제시,
            기타 문의 사항이 있으시면 적극 반영하겠습니다. 감사합니다.
          </h1>
        </div>

        <br></br>
      </div>
      <form onSubmit={onSubmit}>
        <div className="chat-gen">
          <input
            className="chat-gen-input"
            value={chat}
            onChange={(event) => setChat(event.target.value)}
            type="text"
            placeholder="입력해주세요   "
            maxLength={300}
          />
          <input className="chat-gen-btn" type="submit" value="보내기" />
        </div>
      </form>
    </>
  );
}

export default AboutDeveloperPage;
