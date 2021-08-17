import React from "react";
import Chat from "routes/Chat";

// Chat 컴포넌트 재랜더링

function Home({ userObj, typeChoose }) {
  return <Chat userObj={userObj} typeChoose={typeChoose} />;
}

export default Home;
