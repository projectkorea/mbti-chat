import { Link } from "react-router-dom";

function MbtiBlock({
  mbtiType,
  mbtiMsg,
  mbtiPeople,
  userObj,
  setTypeInput,
  setTypeChoose,
  isRecent,
}) {
  const imgSrc = `/symbol/${mbtiType}.png`;

  return (
    <>
      <div className="mbti-block-board--item">
        <img alt="mbti-icon" src={imgSrc} className="board-block-img" />
        <div className="quote-box">
          <h1 className="quote-font">모든 유형은 그만의 빛이 있드아🎇</h1>
        </div>
        <img alt="mbti-icon" src="/icon/like.png" className="board-like-btn" />
      </div>
    </>
  );
}

export default MbtiBlock;
