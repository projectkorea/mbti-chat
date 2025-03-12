import Loading from "../components/common/Loading.jsx";
import { saveUser } from "../utils/db.js";
import {
  authService,
  functionsService,
  VITE_KAKAO_APP_KEY_REST,
} from "../utils/myBase.js";
import { useNavigate } from "react-router-dom";

if (!window.Kakao.isInitialized()) {
  window.Kakao.init(VITE_KAKAO_APP_KEY_REST);
  window.Kakao.isInitialized();
}

const Kakaotalk = () => {
  const navigate = useNavigate();
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  const kakaoAuthCode = params.code;
  if (kakaoAuthCode) {
    // this.token = kakaoAuthCode;
    // 카카오 로그인 토큰을 파이어베이스 함수에 전달합니다.
    var kakaoAuth = functionsService.httpsCallable("KakaoAuth");
    kakaoAuth({ code: kakaoAuthCode })
      .then(function (result) {
        // console.log(result);
        // Read result of the Cloud Function.
        var kakaoToken = result.data.kakao_token;
        var fireToken = result.data.firebase_token;
        // 토근이 정상적으로 처리될 경우 로그인 처리합니다.
        authService
          .signInWithCustomToken(fireToken)
          .then(function (result) {
            // token = kakaoToken;
            window.Kakao.Auth.setAccessToken(kakaoToken);
            const user = result.user;

            if (result.additionalUserInfo.isNewUser) {
              saveUser(user);
              //   console.log("신규 사용자...");
            }
            //업데이트 예정
            navigate("/profile");
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  return <Loading />;
};

export default Kakaotalk;
