import React from "react";

function Loading({ mbtiArray }) {
  //로더 mbtitype 랜덤하게 생성
  const mbtiType =
    mbtiArray[Math.floor(Math.random() * mbtiArray.length)]["type"];
  //로더 img 경로
  const charUrl = "/char/" + mbtiType + ".svg";

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          position: "relative",
          height: "80vh",
          width: "80vw",
        }}
      >
        <div
          style={{
            display: "inline-block",
            position: "absolute",
            top: "80%",
            left: "65%",
            transform: "translate(-50%, -50%)",
            zIndex: 3,
          }}
        >
          <div className="loader-1 center">
            <span></span>
          </div>
          <br></br>
          <h1 style={{ fontFamily: "ONE-Mobile-POP", fontSize: "24px" }}>
            로딩중...
          </h1>
        </div>
        <img
          className="loader-char"
          alt="char"
          src={charUrl}
          style={{
            position: "absolute",
            zIndex: 2,
            width: "300px",
            height: "300px",
            top: "50%",
            left: "65%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    </>
  );
}

export default Loading;
