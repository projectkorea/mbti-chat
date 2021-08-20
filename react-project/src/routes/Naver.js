import Loading from "components/Loading";
import saveUser from "components/SaveUser";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/functions";
import { useHistory } from "react-router-dom";

const Naver = () => {
  const history = useHistory();
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const naverState = params.state;

  // http://localhost:8080/callback/naver?code=jOlzkxTipHpAZQVW9B&state=epuk4m0rzturg0fuic7m
  const state = window.localStorage.getItem("naverState");
  window.localStorage.removeItem("naverState");
  // state 값은 일치해야 합니다.
  if (naverState !== state) {
    alert("잘못된 방법으로 접근하셨습니다. 로그인 페이지로 이동합니다.");
  }
  const naverAuthCode = params.code;
  if (naverAuthCode) {
    // console.log(naverAuthCode);
    // this.token = naverAuthCode;
    // 카카오 로그인 토큰을 파이어베이스 함수에 전달합니다.
    var naverAuth = firebase.functions().httpsCallable("NaverAuth");
    naverAuth({ code: naverAuthCode })
      .then(function (result) {
        // console.log(result);
        // Read result of the Cloud Function.
        var naverToken = result.data.naver_token;
        var fireToken = result.data.firebase_token;
        // 토근이 정상적으로 처리될 경우 로그인 처리합니다.
        firebase
          .auth()
          .signInWithCustomToken(fireToken)
          .then(function (result) {
            // _this.token = naverToken;
            window.localStorage.setItem("NaverToken", naverToken);
            const user = result.user;
            // console.log("User : ", user);
            if (result.additionalUserInfo.isNewUser) {
              saveUser(user);
              //   console.log("신규 사용자...");
            }
            history.push("/profile");
          })
          .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // console.log(error);
            alert(
              "토큰이 정상적이지 않습니다. 만료된 토큰이거나 이미 사용된 토큰입니다."
            );
          });
      })
      .catch(function (error) {
        // Getting the Error details.
        var code = error.code;
        var message = error.message;
        var details = error.details;
        console.log(error);
        console.log(code, message, details);
        console.log(error.body);

        alert(
          "정상적이지 않은 접근입니다. 만료된 데이터이거나 이미 사용된 데이터입니다."
        );
        // alert(message + ' ' + details);
      });
  } else {
    alert("잘못된 방법으로 접근하셨습니다. 로그인 페이지로 이동합니다.");
  }
  return <Loading />;
};

export default Naver;
