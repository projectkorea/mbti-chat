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

  //로그인 상태 확인
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      //   console.log(user);
      if (user) {
        setUserObj(user);
        checkType(user);
        checkCanMakeRoom(user);
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
        />
      ) : (
        <Loading />
      )}
    </>
  );
}

export default App;
