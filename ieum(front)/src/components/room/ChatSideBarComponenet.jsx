import { useEffect, useState } from "react";
import { getCookie } from "../../util/cookieUtil";
import { getListDetail } from "../../api/roomApi"; // API 파일에서 import
import { Link } from "react-router-dom";
import { API_SERVER_HOST } from "../../api/kakaoApi";

const userInfo = getCookie("user");
const userName = userInfo.username;

const ChatSideBarComponenet = () => {
  const [chatList, setChatList] = useState([]);
  const defaultPhotoUrl = `${API_SERVER_HOST}/user/view/default.jpg`;

  useEffect(() => {
    const loadChatList = async () => {
      try {
        const data = await getListDetail(userName);
        setChatList(data);
      } catch (error) {
        console.error("채팅 목록 불러오기 실패:", error);
      }
    };

    loadChatList();
  }, []); // 컴포넌트가 처음 렌더링될 때만 실행
  console.log(chatList);
  return (
    <div className="fixed top-[65px] left-0 z-30 flex flex-col w-[78px] h-[78%] rounded-lg overflow-y-auto bg-sky-100 shadow-sm items-center">
      {chatList.map((chat, index) => (
        <Link
          key={index}
          to={`/roomList/room/${chat.roomId}`} // room 페이지로 이동
          className="flex flex-row py-4 px-2 items-center w-full"
        >
          <div className="w-full">
            <img
              src={`${API_SERVER_HOST}/user/view/${chat.photoPath}`}
              className="h-[44px] w-[40px] rounded-full ring-4 ring-blue-400 m-1 p-1"
              alt="User Avatar"
            />
          </div>
          <div className="flex-grow ml-2">
            <div className="text-lg font-semibold">{chat.username}</div>
            <span className="text-gray-500">{chat.lastMessage}</span>{" "}
            {/* 마지막 메시지 표시 */}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ChatSideBarComponenet;
