import MBTIRankingBar from "src/components/MBTIRankingBar";
import { useState } from "react";
import { mbtiArray } from "utils/mbtiContent.js";
import Navigation from "components/common/Navigation";

function RankPage() {
  const [target, setTarget] = useState("msg");
  const [unit, setUnit] = useState("개");
  let sum = 0;
  mbtiArray.forEach((element) => {
    sum += element[target];
  }); 

  const onClick = (event) => {
    const {
      target: { name },
    } = event;
    if (name === "msg") {
      setTarget("msg");
      setUnit("개");
    } else if (name === "people") {
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
        <div style={{ display: "flex" }}>
          <div className="rank-column" style={{ flexDirection: "column" }}>
            {Array.from({ length: 16 }, (_, index) => (
              <h1 key={index} style={{ margin: "5px", textAlign: "center" }}>
                {index + 1}등:
              </h1>
            ))}
          </div>
          <div
            className="rank-column"
            style={{ flexDirection: "column-reverse" }}
          >
            {mbtiArray.map((element) => (
              <div
                key={element.type}
                style={{ order: element[target], margin: "5px 0px" }}
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
