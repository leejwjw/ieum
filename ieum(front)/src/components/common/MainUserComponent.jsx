import { useEffect, useState } from "react";
import { fetchUsersByInterest } from "../../api/mainApi";
import { getCookie } from "../../util/cookieUtil";
import UserInfoModal from "./UserInfoModal"; // 모달 컴포넌트를 임포트합니다.
import { API_SERVER_HOST } from "../../api/kakaoApi";

const userInfo = getCookie("user");

const MainUserComponent = ({ interestId }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // 선택된 사용자 상태 추가
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태 추가
  const defaultPhotoUrl = `${API_SERVER_HOST}/user/view/default.jpg`;
  useEffect(() => {
    if (!interestId) return;

    const loadUsers = async () => {
      const userList = await fetchUsersByInterest(interestId);
      console.log(`관심사 ${interestId}에 대한 유저 목록:`, userList);

      // userInfo.username과 같은 유저는 제외
      const filteredUsers = userList.filter(
        (user) => user.username !== userInfo.username
      );

      setUsers(filteredUsers);
    };

    loadUsers();
  }, [interestId]);

  // 사용자 클릭 시 모달 열기
  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };
  console.log(users);
  return (
    <div>
      <main>
        <div className="container mx-auto">
          <section>
            <div className="grid gap-8 lg:grid-cols-2 h-px-800 w-4/5 mx-auto">
              <ul className="col-span-full divide-y divide-gray-200 overflow-y-auto border border-gray-300 rounded-md shadow-sm">
                {users.map((user) => (
                  <li
                    key={user.username}
                    className="hover:bg-gray-200 p-5 cursor-pointer" // 커서를 포인터로 설정
                    onClick={() => handleUserClick(user)} // 클릭 시 사용자 정보 모달 띄우기
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          className="w-8 h-8 rounded-full"
                          src={`${API_SERVER_HOST}/user/view/${user.photo_PATH}`}
                          alt={`${user.nick_NAME} 프로필`}
                          onError={(e) => {
                            e.target.src = defaultPhotoUrl;
                          }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {user.nick_NAME}
                        </p>
                        <p className="text-sm text-gray-500">
                          {user.intro || "소개가 없습니다."}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </main>

      {/* UserInfoModal이 열렸을 때만 표시 */}
      {isModalOpen && (
        <UserInfoModal
          user={selectedUser}
          onClose={() => setIsModalOpen(false)} // 모달 닫기 핸들러
        />
      )}
    </div>
  );
};

export default MainUserComponent;
