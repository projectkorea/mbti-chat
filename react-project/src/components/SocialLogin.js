import React from "react";

const SocialLogin = ({ socialType, socialName }) => {
  const imgSrc = `/icon/icon-${socialType}.png`;
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <img
        alt={socialType}
        src={imgSrc}
        style={{
          width: "20px",
          height: "20px",
          margin: "0px 2px 0px 0px",
        }}
      />
      <span>{socialName} 로그인</span>
    </div>
  );
};

export default SocialLogin;
