import { NavLink } from "react-router-dom"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {useUserStore} from "store/useStore.js"; 

const Navigation = () => {
  const { user } = useUserStore();
  const _user = JSON.parse(localStorage.getItem("user")) || null;

  return (
    <nav>
      <div className="nav-header">
        <NavLink to="/" end>
          {/* end 플래그를 사용하여 정확한 매칭을 보장합니다. */}
          <h1 className="logo">유유</h1>
          <h1 className="logo">상종</h1>
        </NavLink>
        <div className="nav-menu">
          <NavLink to="/" end className={({isActive}) => isActive ? "active" : ""}>
            <div className="nav-menu-item">
              <span className="nav-menu-item-font">전체</span>
              <span className="nav-menu-item-font">채팅방</span>
            </div>
          </NavLink>
          <NavLink to="/type">
            <div className="nav-menu-item">
              <span className="nav-menu-item-font">유형별</span>
              <span className="nav-menu-item-font">채팅방</span>
            </div>
          </NavLink>
          <NavLink to="/free">
            <div className="nav-menu-item">
              <span className="nav-menu-item-font">자유</span>
              <span className="nav-menu-item-font">채팅방</span>
            </div>
          </NavLink>
          <NavLink to="/rank">
            <div className="nav-menu-item">
              <span className="nav-menu-item-font">MBTI</span>
              <span className="nav-menu-item-font">랭킹</span>
            </div>
          </NavLink>
        </div>
        <div className="rounded-lg bg-[#F1BE1E] p-[8px_9px]">
          {user || _user ? (
              <NavLink to="/profile">
                <FontAwesomeIcon icon={faUser} color={"#FFFFFF"} size="2x" />
              </NavLink>
          ) : (
            <NavLink to="/login">
              <h1 className="nav--login-btn">로그인</h1>
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
