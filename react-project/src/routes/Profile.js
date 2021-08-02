import React from "react";
import contents from "contents";
import MbtiBlock from "components/MbtiBlock";

function Profile() {
  return (
    <>
      <div>Profile1</div>
      <span>나의 유형은?</span>
      {contents.map((mbtiType) => (
        <MbtiBlock
          mbtiType={mbtiType.type}
          className="mbti-block--profile"
          mode="profile"
        />
      ))}
    </>
  );
}

export default Profile;
