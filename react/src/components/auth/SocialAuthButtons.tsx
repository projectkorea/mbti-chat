import SocialAuthButton from "./SocialAuthButton";
import useOAuthLogin from "hooks/useOAuthLogin";

const SocialAuthButtons = () => {
  const { onNaverClick, onKakaoClick, onGoogleClick, onFacebookClick } =
    useOAuthLogin();

  return (
    <>
      <div className="auth--container">
        <button onClick={onGoogleClick} className="auth--item google">
          <SocialAuthButton socialType="google" />
        </button>
        <button onClick={onFacebookClick} className="auth--item facebook">
          <SocialAuthButton socialType="facebook" />
        </button>
        <button onClick={onNaverClick} className="auth--item naver">
          <SocialAuthButton socialType="naver" />
        </button>
        <button onClick={onKakaoClick} className="auth--item kakao">
          <SocialAuthButton socialType="kakao" />
        </button>
      </div>
    </>
  );
};

export default SocialAuthButtons;
