import React, { useState } from "react";
import { mbtiArray } from "contents";
import MbtiBlock from "components/MbtiBlock";
import Auth from "components/Auth";
import MbtiBadge from "components/MbtiBadge";
import { authService } from "myBase";
import { useHistory } from "react-router-dom";
import Footer from "components/Footer";

function Profile({
  userObj,
  typeChoose,
  setTypeChoose,
  setUserObj,
  isSignInEmail,
}) {
  //페이지 내 타입을 골랐는지 확인하는 state
  const [typeInput, setTypeInput] = useState(false);
  const history = useHistory();
  const onLogOutClick = () => {
    authService.signOut();
    setUserObj(null);
    setTypeChoose(null);
    history.push("/");
  };

  return (
    <>
      <div className="profile">
        <div className="profile-head">
          <h1 className="profile-font--title">프로필</h1>
          {typeChoose || typeInput ? (
            <div
              className="profile--item"
              src="/svg/default-profile.svg"
              alt="profile"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "70%",
                backgroundImage: `url(/char/${userObj.displayName}.svg)`,
                backgroundColor: "rgb(200,200,200)",
                backgroundSize: "150%",
                backgroundPosition: "top",
                backgroundRepeat: "no-repeat",
              }}
            />
          ) : (
            <img
              className="profile--item"
              src="/svg/default-profile.svg"
              alt="profile"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                backgroundColor: "gray",
              }}
            />
          )}
        </div>
        <div className="profile-body">
          {(typeChoose || typeInput) && (
            <>
              <div style={{ margin: "-20px 0px 10px" }}>
                <MbtiBadge mbtiType={userObj.displayName} />
              </div>
              <div className="profile-font">{userObj.photoURL}</div>
            </>
          )}

          {!(typeChoose || typeInput) && (
            <>
              <div className="profile-small">나의 MBTI유형은?</div>
              <div className="mbti-block--container">
                {mbtiArray.map((element) => (
                  <MbtiBlock
                    key={element.type}
                    mbtiType={element.type}
                    forProfile="true"
                    userObj={userObj}
                    setTypeInput={setTypeInput}
                    setTypeChoose={setTypeChoose}
                  />
                ))}
              </div>
            </>
          )}
          <Auth userObj={userObj} isSignInEmail={isSignInEmail} />
          <button className="logout-btn" onClick={onLogOutClick}>
            로그아웃
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
