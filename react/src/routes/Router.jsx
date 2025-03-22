import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import LoginPage from "pages/LoginPage";
import SignUpPage from "pages/SignUpPage";
import RankPage from "pages/RankPage";
import ChatRoomPage from "pages/ChatRoomPage";
import MBTIRoomCardPage from "pages/MBTIRoomCardPage";
import CustomPage from "pages/CustomPage";
import MyPage from "pages/MyPage";
import AboutDeveloperPage from "pages/AboutDeveloperPage";
import PrivacyPolicyPage from "pages/PrivacyPolicyPage";

import Kakaotalk from "./Kakaotalk.jsx";
import Naver from "./Naver.jsx";

import { useUserStore } from "store/useStore";
import useTitleAndColName from "hooks/useTitleAndColName";

const MainRouter = () => {
  const { user } = useUserStore();

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <ChatRoomPage colName="chat" title="전체" />,
      },
      {
        path: "/type",
        element: <MBTIRoomCardPage />,
      },
      {
        path: "/rank",
        element: <RankPage />,
      },
      {
        path: "/room/:param",
        element: <ChatRoomPageWrapper />,
      },
      {
        path: "/qna/1",
        element: <AboutDeveloperPage />,
      },
      {
        path: "/qna/2",
        element: <PrivacyPolicyPage />,
      },
      {
        path: "/free",
        element: <CustomPage />,
      },
      {
        path: "/profile",
        element: <MyPage />,
      },
      {
        path: "/login",
        element: user ? <Navigate to="/" /> : <LoginPage />,
      },
      {
        path: "/login/signup",
        element: <SignUpPage />,
      },
      {
        path: "/callback/kakaotalk",
        element: <Kakaotalk />,
      },
      {
        path: "/callback/naver",
        element: <Naver />,
      },
    ],
    {
      basename: "/chat",
    }
  );
  return <RouterProvider router={router} />;
};

const ChatRoomPageWrapper = () => {
  const { title, colName } = useTitleAndColName();
  return <ChatRoomPage colName={colName} title={title} />;
};

export default MainRouter;
