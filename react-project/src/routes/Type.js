import MbtiBlock from "components/MbtiBlock";
import { dbService } from "myBase";

function Type({ mbtiArray }) {
  const resetBtn = () => {
    mbtiArray.map((element) => {
      const msgNumber = element.type + "-msg";
      const peopleNumber = element.type + "-people";
      dbService
        .collection("info")
        .doc("w7wZ15buqtjglLIpYMjx")
        .update({
          [msgNumber]: 0,
          [peopleNumber]: 0,
        });
    });
  };

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
      {/* <button onClick={resetBtn}>DB 리셋하기</button> */}
    </div>
  );
}

export default Type;
