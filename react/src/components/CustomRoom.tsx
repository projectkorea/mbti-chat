import { Link } from "react-router-dom";
import MbtiBadge from "common/MbtiBadge";
import { loadFiles } from "utils/loadFiles"; 

interface RoomBlockProps {
  title: string;
  path: string;
  mbtiType: string;
  isMine: boolean;
  msgNum: number;
}

function CustomRoom({ title, path, mbtiType, isMine, msgNum }: RoomBlockProps) {
  const svgMap = loadFiles("svg") as Record<string, string>;
  return (
    <>
      <Link to={`room/${path}`} state={{ title }}>
        <div className="room-block--item">
          <MbtiBadge mbtiType={mbtiType} />
          <h1 className="mx-[5px] my-0 text-base">{title}</h1>
          <div className="flex items-center">
            {isMine && (
              <button
                className="room-btn cursor-default bg-green-500"
              >
                MY
              </button>
            )}
            <div className="flex items-center">
              <img
                alt="chat"
                src={svgMap["chat"]}
                className="room-block__icon"
              />
              <div className="text-[rgb(50,50,50)]">{msgNum}</div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default CustomRoom;
