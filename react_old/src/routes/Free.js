import React, { useEffect, useState } from "react";
import { dbService } from "myBase";
import RoomBlock from "components/RoomBlock";
import RoomGen from "components/RoomGen";

function Free({
  userObj,
  typeChoose,
  canMakeRoom,
  setCanMakeRoom,
  isSignInEmail,
}) {
  const [rooms, setRooms] = useState([]);

  //자유 대화방 DB목록
  useEffect(() => {
    dbService
      .collection(`chat-room`)
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const roomArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRooms(roomArray);
      });
    return () => {
      document.body.style.overscrollBehaviorY = "inherit";
    };
  }, []);

  return (
    <>
      <RoomGen
        userObj={userObj}
        typeChoose={typeChoose}
        canMakeRoom={canMakeRoom}
        setCanMakeRoom={setCanMakeRoom}
        isSignInEmail={isSignInEmail}
      />
      <div className="free-chat--container">
        {rooms.map((element) => (
          <RoomBlock
            key={element.creatorType + Math.random()}
            mbtiType={element.creatorType}
            title={element.title}
            path={element.creatorId}
            mbtiPeople={element.people}
            isMine={userObj && element.creatorId === userObj.uid}
            className="room-block"
          />
        ))}
      </div>
    </>
  );
}

export default Free;
