import { Link } from "react-router-dom";

//mbti-count 불러오기
function MbtiBlock({ mbtiType, mbtiCount, mode }) {
  return (
    <>
      {mode ? (
        <button>
          <h1>{mbtiType}</h1>
        </button>
      ) : (
        <div>
          <Link to={`chat/${mbtiType}`}>
            <button>
              <h1>{mbtiType}</h1>
              <h5>메세지 개수:{mbtiCount}</h5>
            </button>
          </Link>
        </div>
      )}
    </>
  );
}

export default MbtiBlock;
