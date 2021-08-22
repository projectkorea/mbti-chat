import Footer from "components/Footer";
import LoginForm from "components/LoginForm";
import SocialLoginBox from "components/SocialLoginBox";
import React from "react";
import { Link } from "react-router-dom";

const SignUp = ({ setSignInEmail }) => {
  const isSignup = true;
  return (
    <>
      <div className="blank" style={{ height: "10vh" }} />
      <div className="login-box">
        <h1 className="logo-title-font">유유상종</h1>
        <div className="subtitle-font-wrapper"></div>
        <SocialLoginBox />
        <div className="dividing--container">
          <div className="dividing--line"></div>
          <h1 className="dividing--font">간편 가입</h1>
          <div className="dividing--line"></div>
        </div>
        <LoginForm setSignInEmail={setSignInEmail} isSignUp={isSignup} />
        <div className="auth--container signup ">
          <h2 className="login-font">아이디가 있다면?</h2>
          <Link to="/login">
            <h1 className="auth--item--signup">로그인</h1>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUp;
