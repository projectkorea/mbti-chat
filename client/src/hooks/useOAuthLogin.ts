import { useNavigate } from "react-router-dom";
import {
  signInAndRedirect,
  GoogleProvider,
  FacebookProvider,
} from "../utils/myBase.js";
import {
  VITE_KAKAO_APP_KEY_REST,
  VITE_NAVER_APP_CLIENT_ID,
} from "../utils/myBase.js";

// Add Kakao SDK type declaration
interface KakaoAuth {
  authorize: (options: { redirectUri: string; throughTalk: boolean }) => void;
}

interface Kakao {
  init: (appKey: string) => void;
  isInitialized: () => boolean;
  Auth: KakaoAuth;
}

// Extend Window interface to include Kakao
declare global {
  interface Window {
    Kakao: Kakao;
  }
}

const useOAuthLogin = () => {
  const navigate = useNavigate();

  const onGoogleClick = async () => {
    const provider = new GoogleProvider();
    await signInAndRedirect(provider);
    navigate("/");
  };

  const onFacebookClick = async () => {
    const provider = new FacebookProvider();
    await signInAndRedirect(provider);
    navigate("/");
  };

  const onKakaoClick = () => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(VITE_KAKAO_APP_KEY_REST);
      window.Kakao.isInitialized();
    }
    const protocol = window.location.protocol;
    const hostName = window.location.hostname;
    const port = window.location.port;
    let url = protocol + "//" + hostName + (port ? ":" + port : "");
    url += "/callback/kakaotalk";
    window.Kakao.Auth.authorize({
      redirectUri: url,
      throughTalk: true,
    });
  };

  const onNaverClick = () => {
    const state =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    window.localStorage.setItem("naverState", state);
    const protocol = window.location.protocol;
    const hostName = window.location.hostname;
    const port = window.location.port;
    let url = protocol + "//" + hostName + (port ? ":" + port : "");
    url += "/callback/naver";
    const authUrl = "https://nid.naver.com/oauth2.0/authorize";
    const params = [];
    params.push("response_type=code");
    params.push("client_id=" + VITE_NAVER_APP_CLIENT_ID);
    params.push("redirect_uri=" + url);
    params.push("state=" + state);
    const authCodeUrl = authUrl + "?" + params.join("&");
    console.log(authCodeUrl);
    window.location.href = authCodeUrl;
  };

  return { onGoogleClick, onFacebookClick, onKakaoClick, onNaverClick };
};

export default useOAuthLogin;
