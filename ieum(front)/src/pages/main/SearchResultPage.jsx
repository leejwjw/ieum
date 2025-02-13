import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSearchResults } from "../../api/mainApi";
import HeaderComponent from "../../components/common/HeaderComponent";
import FooterComponent from "../../components/common/FooterComponent";
import UserInfoModal from "../../components/common/UserInfoModal";
import { API_SERVER_HOST } from "../../api/kakaoApi";

const SearchResultPage = () => {
  const { searchTerm } = useParams();
  const [results, setResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // 선택된 사용자 상태 추가
  const [isModalOpen, setIsModalOpen] = useState(false);
  const defaultPhotoUrl = `${API_SERVER_HOST}/user/view/default.jpg`;
  useEffect(() => {
    if (!searchTerm) return;

    const fetchResults = async () => {
      const data = await fetchSearchResults(searchTerm);
      setResults(data);
    };

    fetchResults();
  }, [searchTerm]);
  console.log(results);
  const count = results.length;
  const handleUserClick = (user) => {
    console.log(user);
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  return (
    <>
      <HeaderComponent />
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">
          {" "}
          "{searchTerm}" 검색 결과
          <span className="font-normal text-sm"> 총 {count}건</span>
        </h1>
        {results.length > 0 ? (
          <div className="grid gap-8 lg:grid-cols-2 h-px-800 w-4/5 mx-auto">
            <ul className="col-span-full divide-y divide-gray-200 overflow-y-auto border border-gray-300 rounded-md shadow-sm">
              {results.map((user) => (
                <li
                  key={user.username}
                  className="hover:bg-gray-200 p-5 cursor-pointer" // 커서를 포인터로 설정
                  onClick={() => handleUserClick(user)} // 클릭 시 사용자 정보 모달 띄우기
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src={`${API_SERVER_HOST}/user/view/${user.photo_PATH}`} // 프로필 이미지 경로 수정
                        alt={`${user.nick_NAME} 프로필`}
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
        ) : (
          <p>검색 결과가 없습니다.</p>
        )}

        {isModalOpen && (
          <UserInfoModal
            user={selectedUser}
            onClose={() => setIsModalOpen(false)} // 모달 닫기 핸들러
          />
        )}
      </div>
      <FooterComponent />
    </>
  );
};

export default SearchResultPage;
