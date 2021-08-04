import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { authService, firebaseInstance } from "myBase";
import LoginForm from "components/LoginForm";
import { Link, useHistory } from "react-router-dom";

const Login = ({ setSignInEmail }) => {
  const history = useHistory();
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "facebook") {
      provider = new firebaseInstance.auth.FacebookAuthProvider();
    }
    await authService.signInWithRedirect(provider);
    history.push("/");
  };

  const onKakaoClick = () => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_APP_KEY_WEB);
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
    params.push("client_id=" + process.env.REACT_APP_NAVER_APP_CLIENT_ID);
    params.push("redirect_uri=" + url);
    params.push("state=" + state);
    const authCodeUrl = authUrl + "?" + params.join("&");
    console.log(authCodeUrl);
    window.location.href = authCodeUrl;
  };

  return (
    <>
      <div className="authContainer">
        <LoginForm setSignInEmail={setSignInEmail} />
        <div className="authBtns">
          <button onClick={onNaverClick} name="naver" className="authBtn">
            네이버 로그인
          </button>
          <button onClick={onKakaoClick} name="kakao" className="authBtn">
            카카오 로그인
          </button>
          <button onClick={onSocialClick} name="google" className="authBtn">
            구글 로그인 <FontAwesomeIcon icon={faGoogle} />
          </button>
          <button onClick={onSocialClick} name="facebook" className="authBtn">
            페이스북 로그인 <FontAwesomeIcon icon={faFacebook} />
          </button>
        </div>
      </div>
      <Link to="/login/signup">가입하기</Link>
    </>
  );
};

export default Login;
