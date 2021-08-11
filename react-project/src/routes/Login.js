import React from "react";
import LoginForm from "components/LoginForm";
import { Link } from "react-router-dom";
import SocialLoginBox from "components/SocialLoginBox";

const Login = ({ setSignInEmail }) => {
  const isSignup = false;
  return (
    <>
      <div className="blank" style={{ height: "10vh" }} />
      <LoginForm setSignInEmail={setSignInEmail} isSignup={isSignup} />
      <div className="dividing--container">
        <div className="dividing--line"></div>
        <h1 className="dividing--font">간편 로그인</h1>
        <div className="dividing--line"></div>
      </div>
      <SocialLoginBox />
      <div className="auth--container signup ">
        <h2 className="login-font">간편하게 계정을 만들고 싶다면?</h2>
        <Link to="/login/signup">
          <h1 className="auth--item--signup">회원가입</h1>
        </Link>
      </div>
    </>
  );
};

export default Login;
