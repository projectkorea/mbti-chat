import React from "react";
import { authService } from "myBase";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Navigation = ({ isLoggedin, setUserObj }) => {
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    setUserObj(null);
    history.push("/");
  };
  return (
    <nav>
      {isLoggedin ? (
        <ul>
          <li>
            들옴
            <Link to="/">
              <FontAwesomeIcon icon={faFacebook} color={"#04AAFF"} size="2x" />
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
        <ul>
          <li>
            아직안들옴
            <Link to="/">
              <FontAwesomeIcon icon={faFacebook} color={"#04AAFF"} size="2x" />
            </Link>
          </li>
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
