import { useEffect, useState } from "react";
import { getCookie } from "../../util/cookieUtil";
import { fetchInterest } from "../../api/mainApi";

const InterestComponent = () => {
  const [interests, setInterests] = useState([]);

  const userInfo = getCookie("user");
  const userName = userInfo?.username; // userInfo가 null일 가능성을 대비

  useEffect(() => {
    if (!userName) return; // userName이 없으면 요청하지 않음

    const loadUserInterests = async () => {
      const userInterests = await fetchInterest(userName);
      console.log("불러온 관심 데이터:", userInterests);

      setInterests(userInterests); // 관심사 데이터 업데이트
    };

    loadUserInterests();
  }, [userName]); // userName이 변경될 때마다 실행

  return (
    <div className="container mx-auto">
      <section className="">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="col-span-full text-center">
            <p className="mt-8 text-lg font-medium text-pretty text-gray-500 mr-8 ml-8 sm:text-xl/8">
              같은 관심사의 회원들
            </p>
          </div>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="col-span-full text-center">
            {interests.map((interest) => (
              <button
                key={interest.userInterestId} // userInterestId 사용
                type="button"
                className="inline-flex items-center px-3 py-2 text-xs font-medium text-blue-700 rounded-lg hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
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
    </div>
  );
};

export default InterestComponent;
