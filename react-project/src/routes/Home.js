import React from "react";
import Chat from "routes/Chat";

//리다이렉트 해주는 이유
//유형별, 자유 채팅방 컴포넌트가 chat
//home도 chat이면 재랜더링이 안되서 컬렉션이 새로고침 안되기 때문

function Home({ userObj, typeChoose }) {
  return <Chat userObj={userObj} typeChoose={typeChoose} />;
}

export default Home;
