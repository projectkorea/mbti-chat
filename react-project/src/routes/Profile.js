import React, { useState } from "react";
import { mbtiArray, mbtiColorArray } from "contents";
import MbtiBlock from "components/MbtiBlock";
import Auth from "components/Auth";

function Profile({ userObj, typeInit, setTypeInit }) {
  //페이지 내 타입을 골랐는지 확인하는 state
  const [typeInput, setTypeInput] = useState(false);
  const creatorType = userObj.displayName && userObj.displayName.toUpperCase();
  const creatorTypeColor = mbtiColorArray[userObj.displayName];
  const creatorTypeUrl = `https://img.shields.io/badge/${creatorType}-${creatorTypeColor}?style=flat-square`;

  return (
    <>
      <div className="profile">
        <div className="profile-head">
          <h1 className="profile-font--title">프로필</h1>
          {typeInit || typeInput ? (
            <div
              className="profile--item"
              src="default-profile.svg"
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
              src="default-profile.svg"
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
          {(typeInit || typeInput) && (
            <img
              alt="type"
              src={creatorTypeUrl}
              style={{ margin: "-5px 0px 10px" }}
            />
          )}
          <div className="profile-font">{userObj.photoURL}</div>
          {!(typeInit || typeInput) && (
            <>
              <div className="profile-small">당신의 MBTI유형은?</div>
              <div className="mbti-block--container">
                {mbtiArray.map((element) => (
                  <MbtiBlock
                    key={element.type}
                    mbtiType={element.type}
                    forProfile="true"
                    userObj={userObj}
                    setTypeInput={setTypeInput}
                    setTypeInit={setTypeInit}
                  />
                ))}
              </div>
            </>
          )}
          <Auth userObj={userObj} />
        </div>
      </div>
    </>
  );
}

export default Profile;
