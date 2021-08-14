import MbtiBlockBoard from "components/MbtiBlockBoard";

function Board({ mbtiArray }) {
  return (
    <div className="mbti-block-board--container">
      {mbtiArray.map((element) => (
        <MbtiBlockBoard
          key={element.type}
          mbtiType={element.type}
          mbtiMsg={element.msg}
          mbtiPeople={element.people}
          isRecent={element.realTime}
          className="mbti-block"
        />
      ))}
    </div>
  );
}

export default Board;
