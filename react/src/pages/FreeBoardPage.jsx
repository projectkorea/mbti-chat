import { useEffect, useState } from "react";
import CustomRoom from "src/components/CustomRoom.js";
import ChatRoomCreator from "src/components/chat/ChatRoomCreator.jsx";
import { useUserStore } from "store/useStore.js";
import Navigation from "common/Navigation";
import { MyBase } from "utils/myBase.js";

function FreeBoardPage() {
  const [rooms, setRooms] = useState([]);
  const { user } = useUserStore();

  useEffect(() => {
    async function fetchData() {
      const res = await MyBase.getFreeBoardInfo();
      setRooms(res);
    }

    fetchData();
  }, [rooms]);

  return (
    <>
      <Navigation />
      <ChatRoomCreator />
      <div className="free-chat--container">
        {rooms.map((element) => (
          <CustomRoom
            key={element.creatorType + Math.random()}
            mbtiType={element.creatorType}
            title={element.title}
            path={element.creatorId}
            isMine={user && element.creatorId === user.uid}
            msgNum={element.msgNum}
          />
        ))}
      </div>
    </>
  );
}

export default FreeBoardPage;
