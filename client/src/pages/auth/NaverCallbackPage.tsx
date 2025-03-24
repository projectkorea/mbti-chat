import { useOAuthCallback } from "hooks/useOAuthCallback";
import Loading from "components/common/Loading";

/**
 * 네이버 로그인 콜백 처리 페이지
 */
const NaverCallbackPage = () => {
  const { error } = useOAuthCallback({
    provider: "naver",
    validateState: true
  });

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return <Loading />;
};

export default NaverCallbackPage; 