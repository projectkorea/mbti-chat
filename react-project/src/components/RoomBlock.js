import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MbtiBadge from "components/MbtiBadge";
import { dbService } from "myBase";

function RoomBlock({ title, path, mbtiType, isMine }) {
  const [msgNum, setMsgNum] = useState(0);

  const dbUpdate = async () => {
    await dbService
      .collection("info")
      .doc("w7wZ15buqtjglLIpYMjx")
      .get()
      .then((doc) => {
        setMsgNum(doc.data()[`${path}-msg`]);
      });
    // setDbInit(true);
  };

  useEffect(() => {
    dbUpdate();
  }, []);

  return (
    <>
      <Link to={{ pathname: `room/${path}`, state: { title: title } }}>
        <div className="room-block--item">
          <MbtiBadge mbtiType={mbtiType} />
          <h1 style={{ margin: "0px 5px", fontSize: "16px" }}>{title}</h1>
          <div style={{ display: "flex", alignItems: "center" }}>
            {isMine && (
              <button
                className="room-btn"
                style={{
                  cursor: "default",
                  backgroundColor: "green",
                }}
              >
                MY
              </button>
            )}
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                alt="chat"
                src="/svg/chat.svg"
                className="room-block__icon"
              />
              <div style={{ color: "rgb(50,50,50)" }}>{msgNum}</div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default RoomBlock;
