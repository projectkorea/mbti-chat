import { useState } from "react";
import { useUserStore } from "store/useStore.js";
import { loadFiles } from "utils/loadFiles";

// Extend User type to include Firebase Auth properties
interface ExtendedUser {
  email: string;
  emailVerified: boolean;
  reload: () => Promise<void>;
  sendEmailVerification: () => Promise<void>;
}

const AccountVerifier = () => {
  const [timerDisplay, setTimerDisplay] = useState<string | boolean>(false);
  const [newVerification, setNewVerification] = useState(true);
  const [verifiedBtn, setVerifiedBtn] = useState(false);
  const { user, isSignInWithEmail } = useUserStore();
  // Using type assertion to inform TypeScript about the expected structure
  const svgMap = loadFiles("svg") as Record<string, string>;
  
  //timer
  const countDownTimer = () => {
    const dateObj = new Date();
    dateObj.setMinutes(dateObj.getMinutes() + 5);
    const newDateObj = new Date(dateObj);

    const showRemaining = async () => {
      await (user as ExtendedUser).reload();
      const now = new Date();
      const distDt = newDateObj.getTime() - now.getTime();
      if (distDt < 0 || (user as ExtendedUser).emailVerified) {
        setTimerDisplay("시간이 초과했습니다. 다시 인증해주세요.");
        setVerifiedBtn(false);
        clearInterval(timerInterval);
        return;
      }
      const minutes = Math.floor(distDt / 60000);
      const seconds = Math.floor((distDt % 60000) / 1000);
      setTimerDisplay(`${minutes}분 ${seconds}초`);
    };
    
    const timerInterval = setInterval(showRemaining, 1000);
  };

  const onCheckVerification = async () => {
    if (verifiedBtn) {
      if (!(user as ExtendedUser).emailVerified) {
        await (user as ExtendedUser).reload();
        // await window.location.reload();
        if (!(user as ExtendedUser).emailVerified) {
          alert("인증 실패. 메일을 확인해주세요.");
        }
      }
    } else {
      alert("인증메일을 먼저 보내세요.");
    }
  };

  const onSendVerifiation = () => {
    setNewVerification((prev) => !prev);
    setVerifiedBtn(true);
    if (!verifiedBtn) {
      countDownTimer(); //타이머 함수 실행하기
      (user as ExtendedUser).sendEmailVerification(); //인증 메일 보내기
      alert(`${(user as ExtendedUser).email} 주소로 인증 코드를 발송했습니다.`);
    } else {
      alert(`이미 발송했습니다. ${(user as ExtendedUser).email} 주소를 확인해주세요.`);
    }
  };

  const onVerification = () => {
    if (newVerification) {
      onSendVerifiation();
    } else {
      onCheckVerification();
    }
  };

  return (
    <>
      {user && (!isSignInWithEmail || (user as ExtendedUser).emailVerified) ? (
        <div className="flex justify-center">
          <img
            alt="success"
            src={svgMap["green-check"]}
            className="w-5 mr-1.5"
          />
          <h1>계정인증 완료</h1>
        </div>
      ) : (
        <div className="flex flex-row justify-center flex-wrap">
          <img
            alt="failure"
            src={svgMap["red-x"]}
            className="inline-block w-5 mr-1.5"
          />
          <div>
            <h1 className="profile-font--small">채팅 기능을 이용하려면,</h1>
            <h1 className="profile-font--small">이메일 인증을 해야합니다.</h1>
          </div>
          <button className="auth--email-btn" onClick={onVerification}>
            {newVerification ? "인증 코드 전송" : "인증 확인하기"}
          </button>
          {timerDisplay && (
            <h1 className="profile-font--small">남은시간: {timerDisplay}</h1>
          )}
        </div>
      )}
    </>
  );
};

export default AccountVerifier;
