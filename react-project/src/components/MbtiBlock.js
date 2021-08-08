import { countService, dbService } from "myBase";
import { Link } from "react-router-dom";
import { nickname } from "components/NicknameGen";
import { useState } from "react";

function MbtiBlock({
  mbtiType,
  forProfile,
  mbtiCount,
  mbtiCitizen,
  userObj,
  setTypeInput,
  setTypeInit,
}) {
  //hover
  const [isHover, setIsHover] = useState(false);

  const onMouseHover = () => {
    setIsHover((prev) => !prev);
  };

  //유형 고르기 && 사람수 DB업데이트하기
  const onClick = async () => {
    //유형 인구수 1올리기
    await dbService
      .collection("mbti-chat-citizen")
      .doc("mQsXVT0f9hXPuhuzspJH")
      .update({
        [mbtiType]: countService.FieldValue.increment(1),
      });

    // 타입과 닉네임 업데이트
    await userObj.updateProfile({
      displayName: mbtiType,
      photoURL: nickname,
    });

    setTypeInput(true);
    setTypeInit(true);
  };
  return (
    <>
      {forProfile ? (
        <button onClick={onClick}>
          <h1>{mbtiType}</h1>
        </button>
      ) : (
        <div className="mbti-block--item">
          <Link to={`chat/${mbtiType}`}>
            <button
              className="mbti-block__btn"
              style={{
                width: "100px",
                height: "100px",
                backgroundImage: `url(/char/${mbtiType}.svg)`,
                backgroundSize: "90%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              onMouseEnter={onMouseHover}
              onMouseLeave={onMouseHover}
            >
              <h1 className="mbti-block__title">{mbtiType}</h1>
              {isHover && (
                <>
                  <div className="mbti-block__subtitle">
                    <h5>메세지 개수:{mbtiCount}</h5>
                    <h5>사람 수:{mbtiCitizen}</h5>
                  </div>
                </>
              )}
            </button>
          </Link>
        </div>
      )}
    </>
  );
}

export default MbtiBlock;
