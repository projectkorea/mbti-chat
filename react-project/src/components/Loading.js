import React, { useEffect, useState } from "react";
import { mbtiArray } from "contents";

function Loading() {
  const mbtiType =
    mbtiArray[Math.floor(Math.random() * mbtiArray.length)]["type"];

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
          <h1 style={{ fontFamily: "ONE-Mobile-POP", fontSize: "28px" }}>
            로딩중...
          </h1>
          <br></br>
        </div>
        <img
          className="loader-char"
          alt="char"
          src={`/char/${mbtiType}.svg`}
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
