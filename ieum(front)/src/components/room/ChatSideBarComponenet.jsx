import { useEffect, useState } from "react";
import { getCookie } from "../../util/cookieUtil";
import { getListDetail } from "../../api/roomApi"; // API 파일에서 import

const userInfo = getCookie("user");
const userName = userInfo.username;

const ChatSideBarComponenet = () => {
  const [chatList, setChatList] = useState([]); // 채팅 목록을 저장할 상태 변수

  useEffect(() => {
    const loadChatList = async () => {
      try {
        const data = await getListDetail(userName); // 채팅 목록 가져오기
        console.log("photo_room_list" + data.length);
        setChatList(data); // 가져온 데이터를 상태에 저장
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
        <div
          key={index}
          className="flex flex-row py-4 px-2 items-center w-full"
        >
          <div className="w-full">
            <img
              src={
                chat.userAvatar ||
                "https://i.namu.wiki/i/YpGHfKcroB7-iwmd-ELXdc9iLF850G8qR73FJ0lkD9OEm1lsnHJL8kUK0VP9xLLCdH3Zl30juHshnv7v38gkqg.jpg"
              } // 기본 이미지 경로 사용
              className="h-[44px] w-[40px] rounded-full ring-4 ring-blue-400 m-1 p-1"
              alt="User Avatar"
            />
          </div>
          <div className="flex-grow ml-2">
            <div className="text-lg font-semibold">{chat.username}</div>
            <span className="text-gray-500">{chat.lastMessage}</span>{" "}
            {/* 마지막 메시지 표시 */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatSideBarComponenet;
