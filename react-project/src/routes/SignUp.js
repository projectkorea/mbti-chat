import React from "react";
import { authService, firebaseInstance } from "myBase";
import LoginForm from "components/LoginForm";
import { Link, useHistory } from "react-router-dom";
import SocialLogin from "components/SocialLogin";

const SignUp = ({ setSignInEmail }) => {
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
        <div className="Social--container">
          <div className="auth--container">
            <button onClick={onNaverClick} name="naver" className="auth--item">
              <SocialLogin socialType={"naver"} socialName="네이버" />
            </button>
            <button onClick={onKakaoClick} name="kakao" className="auth--item">
              <SocialLogin socialType={"kakao"} socialName="카카오" />
            </button>
          </div>
          <div className="auth--container">
            <button
              onClick={onSocialClick}
              name="google"
              className="auth--item"
            >
              <SocialLogin socialType={"google"} socialName="구글" />
            </button>
            <button
              onClick={onSocialClick}
              name="facebook"
              className="auth--item"
            >
              <SocialLogin socialType={"facebook"} socialName={"페이스북"} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
