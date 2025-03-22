import MBTIRoomCard from "components/MBTIRoomCard";
import { mbtiArray } from "utils/mbtiContent.js";
import Navigation from "common/Navigation";

function TypePage() {
  return (
    <>
      <Navigation />
      <div className="mbti-block--container">
        {mbtiArray.map((element) => (
          <MBTIRoomCard
            key={element.type}
            mbtiType={element.type}
            msg={element.msg}
            people={element.people}
            realTime={element.realTime}
          />
        ))}
      </div>
    </>
  );
}

export default TypePage;
