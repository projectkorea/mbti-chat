import Router from "components/Router";
import { authService, dbService } from "myBase";
import { useEffect, useState } from "react";
import { mbtiArray } from "contents";
import Loading from "components/Loading";

function App() {
  const [init, setInit] = useState(false);
  const [dbInit, setDbInit] = useState(false);
  const [realTimeInit, setRealTimeInit] = useState(false);
  const [typeChoose, setTypeChoose] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [canMakeRoom, setCanMakeRoom] = useState(false);
  const [isSignInEmail, setIsSignInEmail] = useState(false);

  //Home화면에 보여질 리얼타임 체크
  const realTimeUpdate = async () => {
    //24시간 전에 채팅기록이 있는지 확인
    let prevDate = Date.now();
    prevDate -= 1000 * 60 * 60;
    //최근에 생성된 다큐멘트가 있다면, element:realTime에 on 추가 시켜주기
    mbtiArray.forEach((element) => {
      dbService
        .collection(`mbti-chat-${element.type}`)
        .where("createdAt", ">", prevDate)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.size) {
            element["realTime"] = "on";
          }
        });
    });
    setRealTimeInit(true);
  };

  // 메세지 대화 수, 사람 수 DB불러오기
  const dbUpdate = async () => {
    await dbService
      .collection("info")
      .doc("w7wZ15buqtjglLIpYMjx")
      .get()
      .then((doc) => {
        mbtiArray.forEach((element) => {
          element["people"] = doc.data()[`${element.type}-people`];
          element["msg"] = doc.data()[`${element.type}-msg`];
        });
      });
    setDbInit(true);
  };

  //type골랐는지 확인해서 프로필에 선택사항 주기
  const checkType = (user) => {
    mbtiArray.forEach((element) => {
      if (user.displayName === element["type"]) {
        setTypeChoose(true);
      }
    });
  };

  //채팅방 만들었는지 확인해서 free route에 주기
  const checkCanMakeRoom = async (user) => {
    await dbService
      .collection("chat-room")
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setCanMakeRoom(false);
        } else {
          setCanMakeRoom(true);
        }
      });
  };

  //이메일 가입으로 들어왔는지 확인하기
  const checkSigninEmail = (user) => {
    //구글, 페이스북, 이메일 로그인
    if (user.providerData.length !== 0) {
      // @가 포함되지 않았으면 -1로 반환
      // -1과 같지 않다면, @가 포함
      // @가 포함되면 true를 반환 = 이메일로 들어왔다는 뜻
      const viaEmail = user.providerData[0]["uid"].indexOf("@") !== -1;
      if (viaEmail) {
        //이메일 로그인
        setIsSignInEmail(true);
      } else {
        //구글, 페이스북 로그인
        setIsSignInEmail(false);
      }
    } else {
      //네이버 또는 카카오 로그인
      setIsSignInEmail(false);
    }
  };

  //로그인 상태 확인
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      //   console.log(user);
      if (user) {
        setUserObj(user);
        checkType(user);
        checkCanMakeRoom(user);
        checkSigninEmail(user);
      }
      setInit(true);
    });
    realTimeUpdate();
    dbUpdate();
  }, []);

  return (
    <>
      {init && dbInit && realTimeInit ? (
        <Router
          isLoggedin={Boolean(userObj)}
          setUserObj={setUserObj}
          userObj={userObj}
          mbtiArray={mbtiArray}
          typeChoose={typeChoose}
          setTypeChoose={setTypeChoose}
          canMakeRoom={canMakeRoom}
          setCanMakeRoom={setCanMakeRoom}
          isSignInEmail={isSignInEmail}
          setIsSignInEmail={setIsSignInEmail}
        />
      ) : (
        <Loading />
      )}
    </>
  );
}

export default App;
