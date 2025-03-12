import { Link } from "react-router-dom";
import PropType from "prop-types";
import MbtiBadge from "common/MbtiBadge";
import { loadFiles } from "utils/loadFiles"; 

function RoomBlock({ title, path, mbtiType, isMine, msgNum }) {
  const svgMap = loadFiles("svg")
  return (
    <>
      <Link to={{ pathname: `room/${path}`, state: { title: title } }}>
        <div className="room-block--item">
          <MbtiBadge mbtiType={mbtiType} />
          <h1 style={{ margin: "0px 5px", fontSize: "16px" }}>{title}</h1>
          <div style={{ display: "flex", alignItems: "center" }}>
            {isMine && (
              <button
                className="room-btn"
                style={{
                  cursor: "default",
                  backgroundColor: "green",
                }}
              >
                MY
              </button>
            )}
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                alt="chat"
                src={svgMap["chat"]}
                className="room-block__icon"
              />
              <div style={{ color: "rgb(50,50,50)" }}>{msgNum}</div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

RoomBlock.propTypes = {
  title: PropType.string.isRequired,
  path: PropType.string.isRequired,
  mbtiType: PropType.string.isRequired,
  isMine: PropType.bool.isRequired,
  msgNum: PropType.number.isRequired,
}

export default RoomBlock;
