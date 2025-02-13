import { useEffect, useState } from "react";
import { getCookie } from "../../util/cookieUtil";
import { fetchInterest } from "../../api/mainApi";
import MainUserComponent from "./MainUserComponent";

const InterestComponent = () => {
  const [interests, setInterests] = useState([]);
  const [selectedInterestId, setSelectedInterestId] = useState(null); // 선택된 관심사 ID

  const userInfo = getCookie("user");
  const userName = userInfo?.username; // userInfo가 null일 가능성을 대비

  useEffect(() => {
    if (!userName) return;

    const loadUserInterests = async () => {
      const userInterests = await fetchInterest(userName);
      console.log("불러온 관심 데이터:", userInterests);

      setSelectedInterestId(userInterests[0].interestId);

      setInterests([...userInterests]); // 배열 복사하여 상태 업데이트
    };

    loadUserInterests();
  }, [userName]); // userName이 변경될 때 실행
  console.log(interests);
  return (
    <div className="container mx-auto">
      <section>
        <section className="">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="col-span-full text-center">
              <p className="mt-8 text-lg font-medium text-gray-500 sm:text-xl">
                🌟 같은 관심사의 회원들 🌟
              </p>
            </div>
          </div>
          <div className="grid gap-8 lg:grid-cols-2 my-[30px]">
            <div className="col-span-full text-center">
              {interests.map((interest) => (
                <button
                  key={interest.userInterestId}
                  type="button"
                  className="inline-flex items-center px-3 py-2 text-xs font-medium text-blue-500 rounded-lg hover:text-white border border-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                  onClick={() => setSelectedInterestId(interest.interestId)} // 클릭 시 선택된 ID 설정
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-5"
                  >
                    <path d={interest.iconPath} />
                  </svg>
                  {interest.iconName}
                </button>
              ))}
            </div>
          </div>
        </section>

        {selectedInterestId && (
          <MainUserComponent interestId={selectedInterestId} />
        )}
      </section>
    </div>
  );
};

export default InterestComponent;
