import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { authService, firebaseInstance } from "myBase";
import LoginForm from "components/LoginForm";
import { useHistory } from "react-router-dom";

const Login = () => {
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
    await authService.signInWithPopup(provider);
    history.push("/");
  };
  return (
    <>
      <div className="authContainer">
        <LoginForm />
        <div className="authBtns">
          <button onClick={onSocialClick} name="google" className="authBtn">
            구글 로그인 <FontAwesomeIcon icon={faGoogle} />
          </button>
          <button onClick={onSocialClick} name="facebook" className="authBtn">
            페이스북 로그인 <FontAwesomeIcon icon={faFacebook} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
