import React from "react";
import { authService } from "myBase";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({
  isLoggedin,
  setUserObj,
  setSignInEmail,
  setTypeInit,
}) => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    setUserObj(null);
    setSignInEmail(null);
    setTypeInit(null);
    setUserObj(null);
    history.push("/");
  };
  return (
    <nav>
      <Link to="/">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            alt="logo"
            src="/mbti-chat-icon-font.svg"
            width="60px"
            height="60px"
            style={{ marginTop: 50 }}
          />
        </div>
      </Link>
      {isLoggedin ? (
        <ul
          style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        >
          <li>
            <Link to="/">
              <img
                alt="logo"
                src="/mbti-chat-icon-font.svg"
                width="60px"
                height="60px"
              />
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
            </Link>
          </li>
          <li>
            <button>
              <span
                className="formBtn cancelBtn logOut"
                onClick={onLogOutClick}
              >
                Log Out
              </span>
            </button>
          </li>
        </ul>
      ) : (
        <ul
          style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        >
          <li>
            <Link to="/login">
              <h3>로그인</h3>
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navigation;
