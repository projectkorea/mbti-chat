import { useEffect } from "react";
import { mbtiArray } from "utils/mbtiContent.js";
import { authService } from "utils/myBase.js";
import ProfileSelector from "src/components/auth/ProfileSelector.js";
import AccountVerifier from "src/components/auth/AccountVerifier.jsx";
import MbtiBadge from "common/MbtiBadge.jsx";
import Navigation from "common/Navigation";
import * as MbtiSVG from "utils/static";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "store/useStore.js";
import { FirebaseUser } from "types/firebase";
import { mbtiPronArray } from "utils/mbtiContent.js";

// Define the MBTI type based on mbtiPronArray keys
type MBTIType = keyof typeof mbtiPronArray;

function MyPage() {
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

  // Cast user to FirebaseUser type when needed
  const firebaseUser = user as FirebaseUser | null;

  return (
    <>
      <Navigation />
      <div className="profile">
        <div className="profile-head">
          <h1 className="profile-font--title">프로필</h1>
          {typeChoose ? (
            <div
              className="profile--item mine"
              style={{
                backgroundImage: `url(${firebaseUser?.displayName ? MbtiSVG[firebaseUser.displayName as keyof typeof MbtiSVG] : ''})`,
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
          {typeChoose && firebaseUser && (
            <>
              <div style={{ margin: "-20px 0px 10px" }}>
                <MbtiBadge mbtiType={firebaseUser.displayName || ''} />
              </div>
              <div className="profile-font">{firebaseUser.photoURL}</div>
            </>
          )}

          {!typeChoose && (
            <>
              <div className="profile-small">나의 MBTI유형은?</div>
              <div className="mbti-block--container">
                {mbtiArray.map((element) => (
                  <ProfileSelector
                    key={element.type}
                    mbtiType={element.type as MBTIType}
                  />
                ))}
              </div>
            </>
          )}
          <AccountVerifier />
          <button className="logout-btn" onClick={onLogOutClick}>
            로그아웃
          </button>
        </div>
      </div>
    </>
  );
}

export default MyPage;
