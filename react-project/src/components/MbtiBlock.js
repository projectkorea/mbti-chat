import { countService, dbService } from "myBase";
import { Link } from "react-router-dom";
import { nickname } from "components/NicknameGen";
import { mbtiPronArray } from "contents";

function MbtiBlock({
  mbtiType,
  forProfile,
  mbtiMsg,
  mbtiPeople,
  userObj,
  setTypeInput,
  setTypeChoose,
  isRecent,
}) {
  const imgSrc = `/char/${mbtiType}.svg`;
  const lightImgSrc = `/icon/icon-light-${isRecent}.png`;
  const peopleNumber = mbtiType + "-people";

  // 프로필에서 사용: 내 유형 고르기 && 사람수 DB업데이트하기
  const onClick = async () => {
    if (
      window.confirm(
        `${mbtiType.toUpperCase()}(${
          mbtiPronArray[mbtiType]
        })를 고르시겠습니까?`
      )
    ) {
      //유형 인구수 1올리기
      await dbService
        .collection("info")
        .doc("w7wZ15buqtjglLIpYMjx")
        .update({
          [peopleNumber]: countService.FieldValue.increment(1),
        });

      // 타입과 닉네임 업데이트
      await userObj.updateProfile({
        displayName: mbtiType,
        photoURL: nickname,
      });
      setTypeInput(true);
      setTypeChoose(true);
    }
  };

  return (
    <>
      {forProfile ? (
        <button onClick={onClick}>
          <h1 className="profile-mbti-block--item">{mbtiType.toUpperCase()}</h1>
        </button>
      ) : (
        <div className="mbti-block--item">
          <h1 className="mbti-block__title">{mbtiType.toUpperCase()}</h1>
          <Link to={`chat/${mbtiType}`}>
            <div style={{ display: "flex", flexDirection: "row-reverse" }}>
              <img
                src={lightImgSrc}
                alt="light"
                style={{
                  width: "15px",
                  height: "15px",
                  margin: "0px 5px 0px 0px",
                }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                alt="char"
                src={imgSrc}
                style={{
                  width: "100px",
                  height: "100px",
                  imageRendering: "optimizeSpeed",
                }}
              />
            </div>
          </Link>
          <div className="mbti-block__detail">
            <img alt="user" src="/svg/user.svg" className="mbti-block__icon" />
            <span className="mbti-block__subtitle">
              {mbtiPeople.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}명
            </span>
          </div>
          <div className="mbti-block__detail">
            <img alt="chat" src="/svg/chat.svg" className="mbti-block__icon" />
            <span className="mbti-block__subtitle">
              {mbtiMsg.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}개
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default MbtiBlock;
