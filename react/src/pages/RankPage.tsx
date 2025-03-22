import MBTIRankingBar from "src/components/MBTIRankingBar";
import { useState } from "react";
import { mbtiArray } from "utils/mbtiContent.js";
import Navigation from "components/common/Navigation";

// Define the type for MBTI array elements
type MBTIElement = {
  type: string;
  msg: number;
  people: number;
  color: string;
  realTime: string;
};

// Define valid target keys
type TargetKey = "msg" | "people";

function RankPage() {
  const [target, setTarget] = useState<TargetKey>("msg");
  const [unit, setUnit] = useState("개");
  let sum = 0;
  mbtiArray.forEach((element: MBTIElement) => {
    sum += element[target];
  }); 

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonName = event.currentTarget.name as TargetKey;
    
    if (buttonName === "msg") {
      setTarget("msg");
      setUnit("개");
    } else if (buttonName === "people") {
      setTarget("people");
      setUnit("명");
    }
  };

  return (
    <>
      <Navigation />
      <div className="rank-container">
        <div className="rank-btn-bar">
          <button className="rank-btn" onClick={onClick} name="msg">
            메세지 수
          </button>
          <button className="rank-btn" onClick={onClick} name="people">
            유형 수
          </button>
        </div>
        <div className="flex">
          <div className="rank-column flex-col">
            {Array.from({ length: 16 }, (_, index) => (
              <h1 key={index} className="m-[5px] text-center">
                {index + 1}등:
              </h1>
            ))}
          </div>
          <div
            className="rank-column flex-col-reverse"
          >
            {mbtiArray.map((element: MBTIElement) => (
              <div
                key={element.type}
                className="my-[5px] mx-0"
                style={{ order: element[target] }}
              >
                <MBTIRankingBar
                  key={element.type}
                  value={element[target]}
                  sum={sum}
                  unit={unit}
                  type={element.type}
                  target={target}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default RankPage;
