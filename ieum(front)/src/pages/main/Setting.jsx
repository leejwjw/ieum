import { Link, useNavigate } from "react-router-dom";
import FooterComponent from "../../components/common/FooterComponent";
import HeaderComponent from "../../components/common/HeaderComponent";
import { useEffect, useState } from "react";
import { API_SERVER_HOST } from "../../api/kakaoApi";
import { getCookie } from "../../util/cookieUtil";
import axios from "axios";
import LogoutModal from "../../components/info/LogoutModal";

const initState = {
  photoPath: null,
  isPublic: true,
  nationName: "",
  lang: "kr",
  address: "",
  nickname: "",
  intro: "",
  interest: [],
  keyword: "",
};

const CookieUserInfo = getCookie("user");
const username = CookieUserInfo.username;

const Setting = () => {

  const [userInfo, setUserInfo] = useState({ ...initState });
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const header = {
    headers: {
      Authorization: `Bearer ${CookieUserInfo.accessToken}`,
    },
  };

  // 모든 쿠키 삭제 함수
  const deleteAllCookies = () => {
    const cookies = document.cookie.split(";");
    cookies.forEach(cookie => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    });
  };

  useEffect(() => {
    // 사용자 정보를 가져오는 함수
    const APIUserInfo = async () => {
      try {
        const response = await axios.get(
          `${API_SERVER_HOST}/user/${username}/getUserInfo`,
          header
        );
        console.log("API Response:", response.data);
        setUserInfo(response.data);
      } catch (err) {
        console.error("사용자 정보를 가져오는데 실패했습니다.", err);
      }
    };
    APIUserInfo();
  }, []);

  // 로그아웃 버튼 클릭 시 모달을 표시하기 위해 modalResult를 빈 문자열(또는 다른 truthy 값)으로 설정
  const handleLogoutClick = () => {
    setResult(""); // 모달 표시를 위한 flag
  };

  // LogoutModal에서 호출할 콜백 함수
  const closeModal = (result) => {
    setResult(result);
    if (result === "Logout Success") {
      // 로그아웃 처리 후 홈으로
      deleteAllCookies
      navigate("/home");
    } else {
      // 취소한 경우 모달 닫기 (상태 초기화)
      setResult(null);
    }
  };


  const defaultPhotoUrl = `${API_SERVER_HOST}/user/view/default.jpg`;
  return (
    <>{result && <LogoutModal callbackFn={closeModal} />}
      <div>
        <HeaderComponent />
        <div className="container max-w-[50rem] mx-auto">
          <section className="grid grid-cols-2 gap-8 pl-4 pr-12">
            <div className="pt-10 pb-5 flex items-center justify-center">
              <img
                className="w-[150px] h-[150px] rounded-full"
                src={`${API_SERVER_HOST}/user/view/${userInfo.photo_PATH}`}
                alt="Uploaded Preview"
                onError={(e) => { e.target.src = defaultPhotoUrl; }}
              />
            </div>

            <div className="pt-10 pb-5">
              <h1 className="text-3xl text-gray-900 dark:text-white">
                {userInfo.nick_NAME}
              </h1>
              <p className="text-base text-gray-700 pt-4 dark:text-white">
              {userInfo.intro}
              </p>
              <p className="text-base sm:text-sm text-gray-700 pt-3 dark:text-white">
              {userInfo.keyword}
              </p>
            </div>
          </section>
          <section className="">
            <div className="grid h-px-800">
              <ul className="my-4 space-y-3  rounded-lg ">
                <li className="bg-sky-50 rounded-lg mb-2">
                  <Link
                    to="/modify"
                    className="flex items-center p-3 text-base font-bold hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                  >
                    <div className="bg-white rounded-full p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-8 text-red-900"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                      </svg>
                    </div>
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      프로필 수정
                    </span>
                    <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-blue-500 rounded dark:bg-gray-700 dark:text-gray-400">
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
                          d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </span>
                  </Link>
                </li>
                <li className="bg-sky-50 rounded-lg">
                  <Link
                    to="/faq"
                    className="flex items-center p-3 text-base font-bold hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                  >
                    <div className="bg-white rounded-full p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-8 text-blue-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                        />
                      </svg>
                    </div>
                    <span className="flex-1 ms-3 whitespace-nowrap">FAQs</span>
                    <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-blue-500 rounded dark:bg-gray-700 dark:text-gray-400">
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
                          d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </span>
                  </Link>
                </li>
                {/* <li className="bg-sky-50 rounded-lg">
                  <Link
                    to="#"
                    className="flex items-center p-3 text-base font-bold hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                  >
                    <div className="bg-white rounded-full p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-8 text-orange-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                        />
                      </svg>
                    </div>
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      이모티콘
                    </span>
                    <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-blue-500 rounded dark:bg-gray-700 dark:text-gray-400">
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
                          d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </span>
                  </Link>
                </li> */}
                {/* <li className="bg-sky-50 rounded-lg">
                  <a
                    href="#"
                    className="flex items-center p-3 text-base font-bold hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                  >
                    <div className="bg-white rounded-full p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-8 text-purple-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                      </svg>
                    </div>
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      구매내역
                    </span>
                    <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-blue-500 rounded dark:bg-gray-700 dark:text-gray-400">
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
                          d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </span>
                  </a>
                </li> */}
              </ul>
            </div>
          </section>
          <section className="p-3 pb-[110px]">
            <div className="grid gap-8 h-px-800">
              <ul className="my-4 space-y-3 bg-sky-50 rounded-lg">
                <li className="bg-sky-50 rounded-lg">
                  <Link
                    onClick={handleLogoutClick}
                    to="#"
                    className="flex items-center p-3 text-base font-bold hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                  >
                    <div className="bg-white rounded-full p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-8 text-blue-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                        />
                      </svg>
                    </div>
                    <span 
                    className="flex-1 ms-3 whitespace-nowrap" >
                      로그아웃
                    </span>
                    {result !== null && <LogoutModal callbackFn={closeModal} />}
                    <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-blue-500 rounded dark:bg-gray-700 dark:text-gray-400">
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
                          d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </span>
                  </Link>
                </li>
                <li className="bg-sky-50 rounded-lg">
                  <Link
                    href="#"
                    className="flex items-center p-3 text-base font-bold hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
                  >
                    <div className="bg-white rounded-full p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-8 text-orange-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </div>
                    <span className="flex-1 ms-3 whitespace-nowrap">
                      회원탈퇴
                    </span>
                    <span className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-blue-500 rounded dark:bg-gray-700 dark:text-gray-400">
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
                          d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        />
                      </svg>
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </section>
        </div>
        <FooterComponent />
      </div>
    </>
  );
};

export default Setting;
