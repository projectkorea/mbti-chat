interface KakaoAuth {
  isInitialized: () => boolean;
  init: (apiKey: string) => void;
  Auth: {
    setAccessToken: (token: string) => void;
  };
}

interface Window {
  Kakao: KakaoAuth;
} 