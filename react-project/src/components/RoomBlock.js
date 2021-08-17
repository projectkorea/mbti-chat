import React, { useState } from "react";
import { Link } from "react-router-dom";
import MbtiBadge from "components/MbtiBadge";

function RoomBlock({ title, path, mbtiType, isMine }) {
  return (
    <>
      {isMine && console.log("만듬")}
      <div className="room-block--item">
        <MbtiBadge mbtiType={mbtiType} />
        <h1>{title}</h1>
        <Link to={`room/${path}`}>
          <button className="room-btn">입장</button>
        </Link>
      </div>
    </>
  );
}

export default RoomBlock;
