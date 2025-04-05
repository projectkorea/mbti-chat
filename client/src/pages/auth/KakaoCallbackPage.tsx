import { useOAuthCallback } from "hooks/useOAuthCallback";
import Loading from "components/common/Loading";
import { VITE_CHAT_KAKAO_APP_KEY_REST } from "utils/myBase.js";
import { useEffect } from "react";

// Initialize Kakao SDK
const initializeKakaoSDK = () => {
  if (window.Kakao && !window.Kakao.isInitialized()) {
    window.Kakao.init(VITE_CHAT_KAKAO_APP_KEY_REST);
    return window.Kakao.isInitialized();
  }
  return false;
};

/**
 * 카카오 로그인 콜백 처리 페이지
 */
const KakaoCallbackPage = () => {
  useEffect(() => {
    initializeKakaoSDK();
  }, []);

  const { error } = useOAuthCallback({
    provider: "kakao"
  });

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return <Loading />;
};

export default KakaoCallbackPage; 