import LoginForm from "../login/LoginForm.jsx";
import { Link } from "react-router-dom";
import SocialLoginBox from "../login/SocialLoginBox.jsx";
import Navigation from "../common/Navigation.jsx";

const LoginPage = () => {
  return (
    <>
      <Navigation isLoggedIn={false} />
      <div className="blank" style={{ height: "10vh" }} />
      <div className="login-box">
        <h1 className="logo-title-font">유유상종</h1>
        <div className="subtitle-font-wrapper">
          <h1 className="subtitle-font">MBTI에 진심인 당신,</h1>
          <h1 className="subtitle-font">
            원하는 유형의 사람들과 무료로 대화해보세요.
          </h1>
        </div>
        <LoginForm isSignUpForm={false} />
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
      </div>
    </>
  );
};

export default LoginPage;
