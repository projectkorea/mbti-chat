import { useEffect, useState } from "react";
import CustomRoom from "src/components/CustomRoom.js";
import ChatRoomCreator from "src/components/chat/ChatRoomCreator.jsx";
import { useUserStore } from "store/useStore.js";
import Navigation from "common/Navigation";
import { MyBase } from "utils/myBase.js";

interface RoomElement {
  id: string;
  creatorId: string;
  creatorType: string;
  title: string;
  msgNum?: number;
  createdAt: number;
  [key: string]: string | number | boolean | undefined;
}

function CustomPage() {
  const [rooms, setRooms] = useState<RoomElement[]>([]);
  const { user } = useUserStore();

  useEffect(() => {
    async function fetchData() {
      const res = await MyBase.getFreeBoardInfo() as RoomElement[];
      setRooms(res);
    }

    fetchData();
  }, []);  // Removed rooms dependency to avoid infinite loop

  // Helper function to safely check if element creator matches current user
  const isCreatorCurrentUser = (creatorId: string) => {
    // Using type assertion to access uid property that TypeScript doesn't recognize
    return user && creatorId === (user as {uid: string}).uid;
  };

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
            isMine={isCreatorCurrentUser(element.creatorId)}
            msgNum={element.msgNum || 0}
          />
        ))}
      </div>
    </>
  );
}

export default CustomPage;
