import Ranking from "components/Ranking";
import React, { useState } from "react";

function Rank({ mbtiArray }) {
  const [target, setTarget] = useState("msg");
  const [unit, setUnit] = useState("개");
  let sum = 0;

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
      <div className="rank-container">
        <div className="rank-btn-wrap">
          <button className="rank-btn" onClick={onClick} name="msg">
            메세지 수
          </button>
          <button className="rank-btn" onClick={onClick} name="people">
            유형 수
          </button>
        </div>
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            {mbtiArray.map((element, index) => (
              <h1 key={index} style={{ margin: "5px", textAlign: "center" }}>
                {index + 1}등:
              </h1>
            ))}
          </div>

          {mbtiArray.forEach((element) => {
            sum += element[target];
          })}

          <div
            style={{
              display: "flex",
              flexDirection: "column-reverse",
              justifyContent: "space-evenly",
            }}
          >
            {mbtiArray.map((element) => (
              <div
                key={element.type}
                style={{ order: element[target], margin: "5px 0px" }}
              >
                <Ranking
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

export default Rank;
