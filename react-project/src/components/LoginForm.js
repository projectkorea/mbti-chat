import { authService } from "myBase";
import React, { useState } from "react";

const LoginForm = ({ setSignInEmail }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await authService
        .signInWithEmailAndPassword(email, password)
        .then(() => setSignInEmail(true));
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <form onSubmit={onSubmit} className="login--container">
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
        <input type="submit" className="login--item submit" value={"Log in"} />
        {error && <span className="authError">{error}</span>}
      </form>
    </>
  );
};

export default LoginForm;
