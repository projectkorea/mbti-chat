import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import * as MbtiSVG from "utils/static";
import { loadFiles } from "utils/loadFiles";
function EnterRoomButton ({ mbtiType, msg, people, realTime }) {
  const svgMap = loadFiles("svg"); 
  const iconMap = loadFiles("icon");
  const lightSrc = iconMap["light-" + realTime];

  return (
    <>
      <div className="mbti-block--item">
        <h1 className="mbti-block__title">{mbtiType.toUpperCase()}</h1>
        <Link to={`/room/${mbtiType}`}>
          <div style={{ display: "flex", flexDirection: "row-reverse" }}>
            <img
              src={lightSrc}
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
              src={MbtiSVG[mbtiType]}
              style={{
                width: "100px",
                height: "100px",
                imageRendering: "optimizeSpeed",
              }}
            />
          </div>
        </Link>
        <div className="mbti-block__detail">
          <img alt="user" src={svgMap.user} className="mbti-block__icon" />
          <span className="mbti-block__subtitle">
            {people.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}명
          </span>
        </div>
        <div className="mbti-block__detail">
          <img alt="chat" src={svgMap.chat} className="mbti-block__icon" />
          <span className="mbti-block__subtitle">
            {msg.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}개
          </span>
        </div>
      </div>
    </>
  );
}

EnterRoomButton.propTypes = {
  mbtiType: PropTypes.string,
  msg: PropTypes.number,
  people: PropTypes.number,
  realTime: PropTypes.string,
};

export default EnterRoomButton;
