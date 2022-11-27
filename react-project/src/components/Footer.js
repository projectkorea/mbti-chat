import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer" style={{ fontFamily: "ELAND_Choice_M" }}>
      <h1
        className="logo-title-font"
        style={{ color: "#969696", margin: "20px" }}
      >
        유유상종
      </h1>
      <h1>ProjectKorea {new Date().getFullYear()} &copy;</h1>
      <br></br>
      <h1>Image Copyright by https://www.16personalities.com</h1>
      <h1>This site is operated for non-commercial purposes.</h1>
      <br></br>
      <div>
        <button style={{ marginRight: "10px" }}>
          <Link to="/qna/1">
            <h1 style={{ padding: "1px" }}>문의</h1>
          </Link>
        </button>
        <button>
          <Link to="/qna/2">
            <h1 style={{ padding: "1px" }}>개인정보처리방침</h1>
          </Link>
        </button>
      </div>
      <br></br>
    </div>
  );
}

export default Footer;
