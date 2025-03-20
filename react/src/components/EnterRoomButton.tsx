import { Link } from "react-router-dom";
import * as MbtiSVG from "utils/static";
import { loadFiles } from "utils/loadFiles";

interface EnterRoomButtonProps {
  mbtiType: string;
  msg: number;
  people: number;
  realTime: string;
}

interface SvgMap {
  [key: string]: string;
  user: string;
  chat: string;
}

interface IconMap {
  [key: string]: string;
}

function EnterRoomButton ({ mbtiType, msg, people, realTime }: EnterRoomButtonProps) {
  const svgMap = loadFiles("svg") as SvgMap; 
  const iconMap = loadFiles("icon") as IconMap;
  const lightSrc = iconMap["light-" + realTime];

  return (
    <>
      <div className="mbti-block--item">
        <h1 className="mbti-block__title">{mbtiType.toUpperCase()}</h1>
        <Link to={`/room/${mbtiType}`}>
          <div className="flex flex-row-reverse">
            <img
              src={lightSrc}
              alt="light"
              className="w-[15px] h-[15px] mr-[5px]"
            />
          </div>
          <div className="flex justify-center">
            <img
              alt="char"
              src={MbtiSVG[mbtiType as keyof typeof MbtiSVG]}
              className="w-[100px] h-[100px]"
              style={{ imageRendering: "pixelated" }}
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

export default EnterRoomButton;
