import { useNavigate } from "react-router-dom";
import { createRoom } from "../../api/roomApi"; // createRoom 함수 임포트
import { getCookie } from "../../util/cookieUtil";

const UserInfoModal = ({ user, onClose }) => {
  if (!user) return null;
  const navigate = useNavigate();

  const onChat = (room) => {
    navigate(`/roomList/room/${room.room_ID}`);
  };

  const handleChatClick = async () => {
    try {
      // 현재 로그인한 사용자 정보
      const userInfo = getCookie("user");

      //   참여자정보 전달
      const roomData = {
        user1: userInfo.username,
        user2: user.username,
      };
      //방생성 -> 채팅방 이동
      const room = await createRoom(roomData);
      onChat(room);
    } catch (error) {
      console.error("채팅방 생성 오류:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-semibold">{user.nick_NAME}</h2>
        <p className="text-gray-500">{user.intro || "소개가 없습니다."}</p>
        <img
          src={user.profileImage || "/default-profile.png"}
          alt={`${user.nick_NAME} 프로필`}
          className="w-24 h-24 rounded-full mt-4 mx-auto"
        />
        <div className="mt-6 flex justify-center gap-10">
          <button
            onClick={handleChatClick} // 대화하기 클릭 시 방 생성 함수 호출
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          >
            대화하기
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-700"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfoModal;
