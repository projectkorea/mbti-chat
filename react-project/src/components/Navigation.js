import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ isLoggedin }) => {
  return (
    <nav>
      <div className="nav-header">
        <Link to="/">
          <img
            alt="logo"
            src="/mbti-chat-icon-font.svg"
            width="60px"
            height="60px"
            onClick={() => window.location.reload()}
          />
        </Link>
        <div className="nav-menu">
          <Link to="/">
            <div className="nav-menu-item">
              <span className="nav-menu-item-font">전체</span>
              <span className="nav-menu-item-font">채팅방</span>
            </div>
          </Link>
          <Link to="/type">
            <div className="nav-menu-item">
              <span className="nav-menu-item-font">유형별</span>
              <span className="nav-menu-item-font">채팅방</span>
            </div>
          </Link>
          <Link to="/free">
            <div className="nav-menu-item">
              <span className="nav-menu-item-font">자유</span>
              <span className="nav-menu-item-font">채팅방</span>
            </div>
          </Link>
          <Link to="/rank">
            <div className="nav-menu-item">
              <span className="nav-menu-item-font">MBTI</span>
              <span className="nav-menu-item-font">순위</span>
            </div>
          </Link>
        </div>
        {isLoggedin ? (
          <>
            <Link to="/profile">
              <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
            </Link>
          </>
        ) : (
          <Link to="/login">
            <h3 className="nav--login">로그인</h3>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
