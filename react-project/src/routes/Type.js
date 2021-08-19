import MbtiBlock from "components/MbtiBlock";

function Type({ mbtiArray }) {
  return (
    <div className="mbti-block--container">
      {mbtiArray.map((element) => (
        <MbtiBlock
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

export default Type;
