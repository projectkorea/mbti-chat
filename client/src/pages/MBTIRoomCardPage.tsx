import MBTIRoomCard from "components/MBTIRoomCard";
import { mbtiArray } from "src/utils/MBTIContents";
import Navigation from "common/Navigation";

function MBTIRoomCardPage() {
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

export default MBTIRoomCardPage;
