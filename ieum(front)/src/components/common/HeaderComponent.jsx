import { Link } from "react-router-dom";

// import { createOpenRoom } from "../../api/roomApi";

// const handleCreatePrivateRoom = async () => {
//   try {
//     const newRoom = await createRoom("1:1 채팅방");
//     setRooms((prevRooms) => [...prevRooms, newRoom]);
//     navigate(`/roomList/room/${newRoom.room_ID}`);
//   } catch (error) {
//     console.error("1:1 채팅방 생성 오류:", error);
//   }
// };

const HeaderComponent = () => {
  // const handleCreateOpenRoom = async () => {
  //   const navigate = useNavigate();
  //   try {
  //     const newRoom = await createOpenRoom({
  //       name: "오픈채팅방",
  //       type: "OPEN",
  //       content: "오픈채팅테스트",
  //       room_limit: "5",
  //     });

  //     navigate(`/roomList/room/${newRoom.room_ID}`);
  //   } catch (error) {
  //     console.error("오픈 채팅방 생성 오류:", error);
  //   }
  // };

  return (
    <header>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-10 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="#"
            onClick={() => {
              window.history.back();
            }}
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
            뒤로가기
          </a>
          {/* <div>
            <button onClick={handleCreatePrivateRoom}>CREATE 1:1CHAT !!</button>
            <button onClick={handleCreateOpenRoom}>CREATE OPENCHAT !!</button>
          </div> */}
          <Link>
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <svg
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 16.7917V9.20837M9.20833 13H16.7917M22.75 13C22.75 17.7862 18.3842 21.6667 13 21.6667C11.406 21.6721 9.83102 21.3209 8.39042 20.6386L3.25 21.6667L4.76125 17.6367C3.80467 16.2955 3.25 14.7052 3.25 13C3.25 8.21387 7.61583 4.33337 13 4.33337C18.3842 4.33337 22.75 8.21387 22.75 13Z"
                  stroke="#3F3F46"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </Link>
        </div>
      </nav>

      <nav className="p-20 bg-white  dark:bg-gray-900 antialiased">
        <form className="max-w-md mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full rounded-[3.5rem] p-4 ps-10 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="검색"
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[3.5rem] text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              검색
            </button>
          </div>
        </form>
      </nav>
    </header>
  );
};

export default HeaderComponent;
