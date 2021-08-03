import React, { useState } from "react";
import array from "contents";
import MbtiBlock from "components/MbtiBlock";

function Profile({ userObj, typeInit }) {
  const [typeInput, setTypeInput] = useState(false);
  return (
    <>
      <div>Profile1</div>
      <span>나의 유형은?</span>
      {typeInit || typeInput
        ? userObj.displayName
        : array.map((element) => (
            <MbtiBlock
              key={element.type}
              mbtiType={element.type}
              className="mbti-block--profile"
              forProfile="true"
              userObj={userObj}
              setTypeInput={setTypeInput}
            />
          ))}
    </>
  );
}

export default Profile;
