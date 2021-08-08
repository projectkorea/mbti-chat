import React, { useState } from "react";
import { mbtiArray } from "contents";
import MbtiBlock from "components/MbtiBlock";
import { authService } from "myBase";

function Profile({ userObj, typeInit, setTypeInit }) {
  //typeInput은 페이지 내 타입 골랐는지 확인하는 state
  const [typeInput, setTypeInput] = useState(false);
  const [verifiedBtn, setVerifiedBtn] = useState(false);

  const onCheckVerification = async () => {
    if (verifiedBtn) {
      if (!userObj.emailVerified) {
        await window.location.reload();
      }
    } else {
      alert("인증메일을 먼저 보내세요.");
    }
  };

  const onSendVerifiation = () => {
    const user = authService.currentUser;
    setVerifiedBtn(true);
    if (!verifiedBtn) {
      user
        .sendEmailVerification()
        .then(
          async () =>
            await alert(`${user.email} 주소로 인증 코드를 발송했습니다.`)
        );
    } else {
      alert(`인증코드를 이미 발송했습니다. ${user.email} 주소를 확인해주세요.`);
    }
  };

  return (
    <>
      <div>Profile1</div>
      {userObj.emailVerified && <h1>인증성공 ID</h1>}
      {!userObj.emailVerified && (
        <>
          <button onClick={onSendVerifiation}>이메일 인증 코드 보내기</button>
          <button onClick={onCheckVerification}>인증 확인하기</button>
          <h1>인증이 필요합니다.</h1>
        </>
      )}
      <span>나의 유형은?</span>
      {typeInit || typeInput
        ? userObj.displayName
        : mbtiArray.map((element) => (
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
