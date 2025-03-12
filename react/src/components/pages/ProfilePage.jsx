import { useEffect } from "react";
import { mbtiArray } from "utils/mbtiContent.js";
import { authService } from "utils/myBase.js";
import ProfileChooseBlock from "../login/ProfileChooseBlock.jsx";
import Verification from "../login/Verification.jsx";
import MbtiBadge from "common/MbtiBadge.jsx";
import Navigation from "common/Navigation";
import * as MbtiSVG from "utils/static";

import { useNavigate } from "react-router-dom";
import { useUserStore } from "store/useStore.js";

function ProfilePage() {
  const { user, setUser, typeChoose, setTypeChoose } = useUserStore();
  const navigate = useNavigate();
  
  const onLogOutClick = () => {
    authService.signOut().then(() => {
      setUser(null);
      setTypeChoose(null);
    });
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <Navigation />
      <div className="profile">
        <div className="profile-head">
          <h1 className="profile-font--title">프로필</h1>
          {typeChoose ? (
            <div
              className="profile--item mine"
              src="/public/project/chat/images/svg/default-profile.svg"
              alt="profile"
              style={{
                backgroundImage: `url(${MbtiSVG[user.displayName]})`,
              }}
            />
          ) : (
            <img
              className="profile--item default"
              src="/public/project/chat/images/svg/default-profile.svg"
              alt="profile"
            />
          )}
        </div>
        <div className="profile-body">
          {typeChoose && (
            <>
              <div style={{ margin: "-20px 0px 10px" }}>
                <MbtiBadge mbtiType={user.displayName} />
              </div>
              <div className="profile-font">{user.photoURL}</div>
            </>
          )}

          {!typeChoose && (
            <>
              <div className="profile-small">나의 MBTI유형은?</div>
              <div className="mbti-block--container">
                {mbtiArray.map((element) => (
                  <ProfileChooseBlock
                    key={element.type}
                    mbtiType={element.type}
                  />
                ))}
              </div>
            </>
          )}
          <Verification />
          <button className="logout-btn" onClick={onLogOutClick}>
            로그아웃
          </button>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
