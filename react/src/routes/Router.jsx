import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import LoginPage from "pages/LoginPage.jsx";
import SignUpPage from "pages/SignUpPage.jsx";
import RankPage from "pages/RankPage.jsx";
import ChatRoomPage from "pages/ChatRoomPage.jsx";
import TypePage from "pages/TypePage.jsx";
import FreeBoardPage from "pages/FreeBoardPage.jsx";

import Profile from "pages/ProfilePage.jsx";
import Kakaotalk from "./Kakaotalk.jsx";
import Naver from "./Naver.jsx";

import AboutDeveloper from "./AboutDeveloper.jsx";
import PrivacyPolicy from "./PrivacyPolicy";

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
        element: <TypePage />,
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
        element: <AboutDeveloper />,
      },
      {
        path: "/qna/2",
        element: <PrivacyPolicy />,
      },
      {
        path: "/free",
        element: <FreeBoardPage />,
      },
      {
        path: "/profile",
        element: <Profile />,
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
