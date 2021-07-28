import React from "react";
import MbtiBlock from "components/MbtiBlock";
import contents from "contents";

function Home() {
  return (
    <>
      <div>Home</div>
      {contents.map((mbtiType) => (
        <MbtiBlock mbtiType={mbtiType.type} className="mbti-block" />
      ))}
    </>
  );
}

export default Home;
