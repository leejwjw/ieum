import { Link } from "react-router-dom";
import { getCookie } from "../../util/cookieUtil";
import SearchComponent from "./SearchComponent";
import { API_SERVER_HOST } from "../../api/kakaoApi";
const userInfo = getCookie("user");

const HeaderComponent = () => {
  const defaultPhotoUrl = `${API_SERVER_HOST}/user/view/default.jpg`;
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
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <Link to={`/setting`} className="flex items-center gap-2">
              {console.log(userInfo)}
              <img
                className="w-[30px] h-[30px] rounded-full"
                src={`${API_SERVER_HOST}/user/view/${userInfo.photoPath}`}
                alt="Uploaded Preview"
                onError={(e) => {
                  e.target.src = defaultPhotoUrl;
                }}
              />
              <p>{userInfo.nickname ? userInfo.nickname : "설정"}</p>
            </Link>
          </div>
        </div>
      </nav>

      {/* 검색 헤더 따로 분리해아함 */}
      <SearchComponent />
    </header>
  );
};

export default HeaderComponent;
