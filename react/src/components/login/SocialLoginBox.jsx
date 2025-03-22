import SocialLogin from "./SocialLogin.jsx";
import useOAuthLogin from "hooks/useOAuthLogin";

const SocialLoginBox = () => {
  const { onNaverClick, onKakaoClick, onGoogleClick, onFacebookClick } =
    useOAuthLogin();

  return (
    <>
      <div className="auth--container">
        <button onClick={onGoogleClick} className="auth--item google">
          <SocialLogin socialType="google" socialName="구글" />
        </button>
        <button onClick={onFacebookClick} className="auth--item facebook">
          <SocialLogin socialType="facebook" socialName="페이스북" />
        </button>
        <button onClick={onNaverClick} className="auth--item naver">
          <SocialLogin socialType="naver" socialName="네이버" />
        </button>
        <button onClick={onKakaoClick} className="auth--item kakao">
          <SocialLogin socialType="kakao" socialName="카카오" />
        </button>
      </div>
    </>
  );
};

export default SocialLoginBox;
