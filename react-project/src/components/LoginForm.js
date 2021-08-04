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
        .createUserWithEmailAndPassword(email, password)
        .then(() => setSignInEmail(true));
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="authInput"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="authInput"
        />
        <input type="submit" className="authError" value={"Log in"} />
        {error && <span className="authError">{error}</span>}
      </form>
    </>
  );
};

export default LoginForm;
