import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleOAuthAuthentication } from "utils/auth.js";

type OAuthProvider = "naver" | "kakao";

interface UseOAuthCallbackOptions {
  provider: OAuthProvider;
  validateState?: boolean;
  onTokenReceived?: (token: string) => void;
}

interface OAuthCallbackState {
  error: string | null;
  isLoading: boolean;
}

/**
 * 소셜 로그인 콜백을 처리하는 커스텀 훅
 */
export const useOAuthCallback = ({
  provider,
  validateState = false,
  onTokenReceived,
}: UseOAuthCallbackOptions): OAuthCallbackState => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const processOAuthCallback = async () => {
      try {
        // URL 파라미터 파싱
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        const authCode = params.code;

        // 상태 검증 (필요한 경우)
        if (validateState && provider === "naver") {
          const naverState = params.state;
          const storedState = window.localStorage.getItem("naverState");
          window.localStorage.removeItem("naverState");
          
          if (naverState !== storedState) {
            setError("잘못된 방법으로 접근하셨습니다. 로그인 페이지로 이동합니다.");
            setTimeout(() => navigate("/"), 2000);
            return;
          }
        }

        // 인증 코드 검증
        if (!authCode) {
          setError("잘못된 방법으로 접근하셨습니다. 로그인 페이지로 이동합니다.");
          setTimeout(() => navigate("/"), 2000);
          return;
        }

        // 토큰 핸들러 함수 설정
        const tokenHandler = provider === "naver"
          ? (token: string) => window.localStorage.setItem("NaverToken", token)
          : provider === "kakao"
            ? (token: string) => window.Kakao.Auth.setAccessToken(token)
            : onTokenReceived;

        // 인증 처리
        const result = await handleOAuthAuthentication(
          authCode,
          `${provider.charAt(0).toUpperCase() + provider.slice(1)}Auth`,
          tokenHandler,
          navigate
        );

        if (!result.success) {
          const errorMessage = provider === "naver"
            ? "토큰이 정상적이지 않습니다. 만료된 토큰이거나 이미 사용된 토큰입니다."
            : "인증 과정에서 오류가 발생했습니다.";
          
          setError(errorMessage);
          setTimeout(() => navigate("/"), 2000);
        } else {
          setIsLoading(false);
        }
      } catch (err) {
        console.error("OAuth callback error:", err);
        setError("인증 과정에서 오류가 발생했습니다.");
        setTimeout(() => navigate("/"), 2000);
      }
    };

    processOAuthCallback();
  }, [navigate, provider, validateState, onTokenReceived]);

  return { error, isLoading };
}; 