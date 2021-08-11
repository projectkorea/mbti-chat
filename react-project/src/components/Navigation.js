import React from "react";
import { authService } from "myBase";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ isLoggedin, setUserObj, setTypeInit }) => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    setUserObj(null);
    setTypeInit(null);
    history.push("/");
  };
  return (
    <nav>
      <div className="header">
        <Link to="/">
          <img
            alt="logo"
            src="/mbti-chat-icon-font.svg"
            width="60px"
            height="60px"
          />
        </Link>
        {isLoggedin ? (
          <>
            <button>
              <span
                className="formBtn cancelBtn logOut"
                onClick={onLogOutClick}
              >
                Log Out
              </span>
            </button>

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
