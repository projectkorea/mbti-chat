import React, { useState } from "react";

function Rank({ mbtiArray }) {
  const [target, setTarget] = useState("msg");
  const [unit, setUnit] = useState("개");

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
            메세지
          </button>
          <button className="rank-btn" onClick={onClick} name="people">
            사람
          </button>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h1>1등</h1>
            <h1>2등</h1>
            <h1>3등</h1>
            <h1>4등</h1>
            <h1>5등</h1>
            <h1>6등</h1>
            <h1>7등</h1>
            <h1>8등</h1>
            <h1>9등</h1>
            <h1>10등</h1>
            <h1>11등</h1>
            <h1>12등</h1>
            <h1>13등</h1>
            <h1>14등</h1>
            <h1>15등</h1>
            <h1>16등</h1>
          </div>
          <div style={{ display: "flex", flexDirection: "column-reverse" }}>
            {mbtiArray.map((element, index) => (
              <>
                <div style={{ order: element[target] }}>
                  <span>{element.type}</span>
                  <span>: {element[target]}</span>
                  <span>{unit}</span>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Rank;
