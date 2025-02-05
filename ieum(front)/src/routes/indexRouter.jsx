import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import LoadingPage from "../components/common/LoadingPage";
import RoomListPage from "../pages/room/RoomListPage";
import RoomComponent from "../components/room/RoomComponent";

// 지연 로딩 처리
const KakakoRedirect = lazy(() => import("../pages/user/KakaoRedirectPage"));
const Home = lazy(() => import("../pages/main/Home"));
const Main = lazy(() => import("../pages/main/Main"));
const Info = lazy(() => import("../pages/main/Info"));
const MyInfo = lazy(() => import("../pages/main/MyInfo"));

const Router = () => {
  return useRoutes([
    {
      path: "/home",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Home />
        </Suspense>
      ),
    },
    {
      path: "/main",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Main />
        </Suspense>
      ),
    },
    {
      path: "/info",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Info />
        </Suspense>
      ),
    },
    {
      path: "kakao",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <KakakoRedirect />
        </Suspense>
      ),
    },
    {
      path: "/roomList",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <RoomListPage />
        </Suspense>
      ),
    },
    {
      path: "/myinfo",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <MyInfo />
        </Suspense>
      ),
    },
    {
      path: "/roomList/room/:room_ID",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <RoomComponent />
        </Suspense>
      ),
    },
  ]);
};

export default Router;
