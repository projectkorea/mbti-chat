import { useState } from "react";
import { createUser } from "utils/myBase.js";
import { signInEmail } from "utils/myBase";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ isSignUpForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      await signInEmail(email, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const onSubmitSignUp = async () => {
    try {
      await createUser(email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  const onValidatePassword = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      onSubmitSignUp();
    }
  };

  return (
    <>
      {isSignUpForm ? (
        <form className="login--container" onSubmit={onValidatePassword}>
          <input
            name="email"
            type="text"
            placeholder="이메일 주소 mbti@jinsim.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login--item input"
          />
          <input
            name="password"
            type="password"
            placeholder="비밀번호 (6자 이상)"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login--item input"
          />
          <input
            name="password2"
            type="password"
            placeholder="비밀번호 (6자 이상)"
            required
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="login--item input"
          />
          <input
            type="submit"
            className="login--item submit"
            value={"가입하기"}
          />
          {error && <span className="authError">{error}</span>}
        </form>
      ) : (
        <form onSubmit={onSubmitLogin} className="login--container">
          <input
            name="email"
            type="text"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login--item input"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login--item input"
          />
          <input
            type="submit"
            className="login--item submit"
            value={"로그인"}
          />
          {error && <span className="authError">{error}</span>}
        </form>
      )}
    </>
  );
};

export default LoginForm;
