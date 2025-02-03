import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import RoomListPage from "../pages/room/RoomListPage";
import RoomComponent from "../components/room/RoomComponent";
import Home from "../pages/main/Home";
// import roomRouter from "./roomRouter";

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
      path: "/roomList",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <RoomListPage />
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
