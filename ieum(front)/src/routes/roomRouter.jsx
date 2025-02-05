import { lazy, Suspense } from "react";
const RoomPage = lazy(() => import("../pages/room/RoomPage"));

const roomRouter = () => {
  console.log(1231232132);
  return [
    {
      path: "room/:room_ID",
      element: (
        <Suspense>
          <RoomPage />
        </Suspense>
      ),
    },
  ];
};

export default roomRouter;
