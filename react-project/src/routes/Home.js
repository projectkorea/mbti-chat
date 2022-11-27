import React from "react";
import Chat from "routes/Chat";

// Chat 컴포넌트 재랜더링
// 채팅방으로 바로 넘어오면, chat이 재랜더링이 안되서 그대로임

function Home({ userObj, typeChoose }) {
  return <Chat userObj={userObj} typeChoose={typeChoose} />;
}

export default Home;
