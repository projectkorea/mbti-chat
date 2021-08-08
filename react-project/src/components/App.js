import Router from "components/Router";
import { authService, dbService } from "myBase";
import { useEffect, useState } from "react";
import { mbtiArray } from "contents";

function App() {
  const [init, setInit] = useState(false);
  const [dbInit, setdbInit] = useState(false);
  const [typeInit, setTypeInit] = useState(false);
  const [signInEmail, setSignInEmail] = useState(false);
  const [userObj, setUserObj] = useState(null);

  //로더 mbtitype 랜덤하게 생성
  const mbtiType =
    mbtiArray[Math.floor(Math.random() * mbtiArray.length)]["type"];
  //로더 img 경로
  const charUrl = "/char/" + mbtiType + ".svg";

  // 메세지 대화 수, 사람 수 DB불러오기
  const dbUpdate = async () => {
    await dbService
      .collection("mbti-chat-count")
      .doc("U4cBg755pLzeo5Mi8BMe")
      .get()
      .then((doc) => {
        mbtiArray.forEach((element) => {
          element["count"] = doc.data()[element.type];
        });
      });
    await dbService
      .collection("mbti-chat-citizen")
      .doc("mQsXVT0f9hXPuhuzspJH")
      .get()
      .then((doc) => {
        mbtiArray.forEach((element) => {
          element["citizen"] = doc.data()[element.type];
        });
      });
    setdbInit(true);
  };

  //type골랐는지 확인해서 프로필에 선택사항 주기
  const checkType = (user) => {
    if (user) {
      if (user.providerData[0]["uid"].indexOf("@") !== -1) {
        console.log("@들어감");
      }
      mbtiArray.forEach((element) => {
        if (user.displayName === element["type"]) {
          setTypeInit(true);
        }
      });
    }
  };

  //로그인 상태 확인
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
        checkType(user);
      }
      setInit(true);
    });
    dbUpdate();
  }, []);

  return (
    <>
      {init && dbInit ? (
        <Router
          isLoggedin={Boolean(userObj)}
          setUserObj={setUserObj}
          userObj={userObj}
          mbtiArray={mbtiArray}
          typeInit={typeInit}
          setTypeInit={setTypeInit}
          setSignInEmail={setSignInEmail}
          signInEmail={signInEmail}
        />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            position: "relative",
            height: "100vh",
            width: "100vw",
          }}
        >
          <div
            style={{
              display: "inline-block",
              position: "absolute",
              top: "75%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 3,
            }}
          >
            <div class="loader-1 center">
              <span></span>
            </div>
            <h1> Loading...</h1>
          </div>

          <img
            class="loader-char"
            alt="char"
            src={charUrl}
            style={{
              position: "absolute",
              zIndex: 2,
              width: "300px",
              height: "300px",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      )}
    </>
  );
}

export default App;
