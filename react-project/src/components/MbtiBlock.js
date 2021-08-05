import { countService, dbService } from "myBase";
import { Link } from "react-router-dom";
import { nickname } from "components/NicknameGen";

function MbtiBlock({
  mbtiType,
  forProfile,
  mbtiCount,
  mbtiCitizen,
  userObj,
  setTypeInput,
  setTypeInit,
}) {
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
        <div>
          <Link to={`chat/${mbtiType}`}>
            <button>
              <h1>{mbtiType}</h1>
              <h5>메세지 개수:{mbtiCount}</h5>
              <h5>사람 수:{mbtiCitizen}</h5>
            </button>
          </Link>
        </div>
      )}
    </>
  );
}

export default MbtiBlock;
