import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import LoadingPage from "../components/common/LoadingPage";
import PrivateRoute from "../components/common/PrivateRoute";

// 지연 로딩 처리
const KakakoRedirect = lazy(() => import("../pages/user/KakaoRedirectPage"));
const Home = lazy(() => import("../pages/main/Home"));
const Main = lazy(() => import("../pages/main/Main"));
const MyInfo = lazy(() => import("../pages/main/MyInfo"));
const Modify = lazy(() => import("../pages/main/Modify"));
const Setting = lazy(() => import("../pages/main/Setting"));
const Faq = lazy(() => import("../pages/main/Faq"));
const RoomComponent = lazy(() => import("../components/room/RoomComponent"));
const RoomListPage = lazy(() => import("../pages/room/RoomListPage"));
const SearchResultPage = lazy(() => import("../pages/main/SearchResultPage"));

const Router = () => {
  return useRoutes([
    {
      path: "/home",
      element: (
        <Suspense fallback={<LoadingPage />}>
          <Home />
        </Suspense>
      ),
    },
    {
      path: "/main",
      element: (
        <PrivateRoute>
          <Suspense fallback={<LoadingPage />}>
            <Main />
          </Suspense>
        </PrivateRoute>
      ),
    },
    {
      path: "/myinfo",
      element: (
        <PrivateRoute>
          <Suspense fallback={<div>Loading...</div>}>
            <MyInfo />
          </Suspense>
        </PrivateRoute>
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
        <PrivateRoute>
          <Suspense fallback={<LoadingPage />}>
            <RoomListPage />
          </Suspense>
        </PrivateRoute>
      ),
    },
    {
      path: "/myinfo",
      element: (
        <PrivateRoute>
          <Suspense fallback={<LoadingPage />}>
            <MyInfo />
          </Suspense>
        </PrivateRoute>
      ),
    },
    {
      path: "/modify",
      element: (
        <PrivateRoute>
          <Suspense fallback={<LoadingPage />}>
            <Modify />
          </Suspense>
        </PrivateRoute>
      ),
    },
    {
      path: "/roomList/room/:room_ID",
      element: (
        <PrivateRoute>
          <Suspense fallback={<LoadingPage />}>
            <RoomComponent />
          </Suspense>
        </PrivateRoute>
      ),
    },
    {
      path: "/setting",
      element: (
        <PrivateRoute>
          <Suspense fallback={<LoadingPage />}>
            <Setting />
          </Suspense>
        </PrivateRoute>
      ),
    },
    {
      path: "/faq",
      element: (
        <PrivateRoute>
          <Suspense fallback={<LoadingPage />}>
            <Faq />
          </Suspense>
        </PrivateRoute>
      ),
    },
    {
      path: "/user/search/:searchTerm",
      element: (
        <PrivateRoute>
          <Suspense fallback={<LoadingPage />}>
            <SearchResultPage />
          </Suspense>
        </PrivateRoute>
      ),
    },
  ]);
};

export default Router;
