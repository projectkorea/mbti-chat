import React, { useState } from "react";
import array from "contents";
import MbtiBlock from "components/MbtiBlock";
import { authService } from "myBase";

function Profile({ userObj, typeInit, setTypeInit }) {
  //typeInput은 페이지 내 타입 골랐는지 확인하는 state
  const [typeInput, setTypeInput] = useState(false);
  return (
    <>
      <div>Profile1</div>
      {!userObj.emailVerified && (
        <button
          onClick={() =>
            authService.currentUser
              .sendEmailVerification()
              .then(() => alert("인증 메일을 확인해주세요."))
          }
        >
          이메일 인증하기
        </button>
      )}
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
              setTypeInit={setTypeInit}
            />
          ))}
    </>
  );
}

export default Profile;
