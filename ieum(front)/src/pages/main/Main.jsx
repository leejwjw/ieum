import HeaderComponent from "../../components/common/HeaderComponent";
import FooterComponent from "../../components/common/FooterComponent";
import { getOpenRoomList } from "../../api/roomApi";
import { useEffect, useState } from "react";
import jwtAxios from "../../util/jwtUtil";
import { getCookie } from "../../util/cookieUtil";

const Main = () => {
  const [rooms, setRooms] = useState([]);
  const [interests, setInterests] = useState([]);

  const userinfo = getCookie("user");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getOpenRoomList();
        setRooms(data);
      } catch (error) {
        console.error("에러ㅠㅠ", error);
      }
    };

    fetchRooms();
  }, []);

  // 관심사 데이터 가져오기
  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const response = await jwtAxios.get(
          "http://localhost:8080/user/interests",
          {
            params: {
              username: userinfo.username, // 사용자 이름
            },
          }
        );
        setInterests(response.data); // 관심사 데이터를 상태로 저장
      } catch (error) {
        console.error("Error fetching interests:", error);
      }
    };

    fetchInterests();
  }, []);
  return (
    <>
      <HeaderComponent />
      <main>
        <div className="container mx-auto">
          <section className="">
            <div className="grid gap-8 lg:grid-cols-2">
              <div
                id="carouselExampleCaptions"
                className="relative col-span-full divide-y divide-gray-200 dark:divide-gray-700"
                data-twe-carousel-init
                data-twe-carousel-slide
              >
                <div
                  className="absolute bottom-0 left-0 right-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0"
                  data-twe-carousel-indicators
                >
                  <button
                    type="button"
                    data-twe-target="#carouselExampleCaptions"
                    data-twe-slide-to="0"
                    data-twe-carousel-active
                    className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-twe-target="#carouselExampleCaptions"
                    data-twe-slide-to="1"
                    className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
                    aria-label="Slide 2"
                  ></button>
                  <button
                    type="button"
                    data-twe-target="#carouselExampleCaptions"
                    data-twe-slide-to="2"
                    className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
                    aria-label="Slide 3"
                  ></button>
                </div>

                <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
                  <div
                    className="relative float-left -me-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                    data-twe-carousel-active
                    data-twe-carousel-item
                  >
                    <img
                      src="https://tecdn.b-cdn.net/img/Photos/Slides/img%20(15).jpg"
                      className="block w-full"
                      alt="..."
                    />
                    <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
                      <h5 className="text-xl">First slide label</h5>
                      <p>
                        Some representative placeholder content for the first
                        slide.
                      </p>
                    </div>
                  </div>

                  <div
                    className="relative float-left -me-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                    data-twe-carousel-item
                  >
                    <img
                      src="https://tecdn.b-cdn.net/img/Photos/Slides/img%20(22).jpg"
                      className="block w-full"
                      alt="..."
                    />
                    <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
                      <h5 className="text-xl">Second slide label</h5>
                      <p>
                        Some representative placeholder content for the second
                        slide.
                      </p>
                    </div>
                  </div>

                  <div
                    className="relative float-left -me-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                    data-twe-carousel-item
                  >
                    <img
                      src="https://tecdn.b-cdn.net/img/Photos/Slides/img%20(23).jpg"
                      className="block w-full"
                      alt="..."
                    />
                    <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
                      <h5 className="text-xl">Third slide label</h5>
                      <p>
                        Some representative placeholder content for the third
                        slide.
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  className="absolute bottom-0 left-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
                  type="button"
                  data-twe-target="#carouselExampleCaptions"
                  data-twe-slide="prev"
                >
                  <span className="inline-block h-8 w-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5"
                      />
                    </svg>
                  </span>
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Previous
                  </span>
                </button>

                <button
                  className="absolute bottom-0 right-0 top-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-white opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-white hover:no-underline hover:opacity-90 hover:outline-none focus:text-white focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
                  type="button"
                  data-twe-target="#carouselExampleCaptions"
                  data-twe-slide="next"
                >
                  <span className="inline-block h-8 w-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </span>
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Next
                  </span>
                </button>
              </div>
            </div>
          </section>
          <section className="">
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="col-span-full text-center">
                <p className="mt-8 text-lg font-medium text-pretty text-gray-500 mr-8 ml-8 sm:text-xl/8">
                  최근 대화 많은 방을 추천 드려요!
                </p>
              </div>
            </div>
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="col-span-full text-center">
                {interests.map((interest) => (
                  <button
                    key={interest.interestId} // 유니크 키 값 설정
                    type="button"
                    className="inline-flex items-center px-3 py-2 text-xs font-medium text-blue-700 rounded-lg hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="size-5"
                    >
                      {/* 아이콘 데이터 기반으로 설정 가능 */}
                      <path d={interest.iconPath} />
                    </svg>
                    {interest.iconName} {/* 관심사 이름 표시 */}
                  </button>
                ))}
              </div>
            </div>
            {/* <div className="grid gap-8 lg:grid-cols-2 h-px-600">
              <ul className="col-span-full divide-y divide-gray-200 dark:divide-gray-700 overflow-y-auto overflow-x-hidden pb-[80px]">
                <li className="hover:bg-gray-200 p-5 lg:p-5 sm:p-3">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src="https://plus.unsplash.com/premium_photo-1730828573938-003e14f210f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Neil image"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        자유방 #1
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        자유로운 대화 #1
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        #자유, #아무나
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-700 dark:text-white">
                      오전 3:10
                    </div>
                  </div>
                </li>
                <li className="hover:bg-gray-200 p-5 lg:p-5 sm:p-3">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src="https://plus.unsplash.com/premium_photo-1730828573938-003e14f210f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Neil image"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        자유방 #1
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        자유로운 대화 #1
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        #자유, #아무나
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-700 dark:text-white">
                      오전 3:10
                    </div>
                  </div>
                </li>
                <li className="hover:bg-gray-200 p-5 lg:p-5 sm:p-3">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src="https://plus.unsplash.com/premium_photo-1730828573938-003e14f210f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Neil image"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        자유방 #1
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        자유로운 대화 #1
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        #자유, #아무나
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-700 dark:text-white">
                      오전 3:10
                    </div>
                  </div>
                </li>
                <li className="hover:bg-gray-200 p-5 lg:p-5 sm:p-3">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src="https://plus.unsplash.com/premium_photo-1730828573938-003e14f210f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Neil image"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        자유방 #1
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        자유로운 대화 #1
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        #자유, #아무나
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-700 dark:text-white">
                      오전 3:10
                    </div>
                  </div>
                </li>
                <li className="hover:bg-gray-200 p-5 lg:p-5 sm:p-3">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src="https://plus.unsplash.com/premium_photo-1730828573938-003e14f210f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Neil image"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        자유방 #1
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        자유로운 대화 #1
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        #자유, #아무나
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-700 dark:text-white">
                      오전 3:10
                    </div>
                  </div>
                </li>
                <li className="hover:bg-gray-200 p-5 lg:p-5 sm:p-3">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src="https://plus.unsplash.com/premium_photo-1730828573938-003e14f210f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Neil image"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        자유방 #1
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        자유로운 대화 #1
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        #자유, #아무나
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-700 dark:text-white">
                      오전 3:10
                    </div>
                  </div>
                </li>
                <li className="hover:bg-gray-200 p-5 lg:p-5 sm:p-3">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src="https://plus.unsplash.com/premium_photo-1730828573938-003e14f210f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Neil image"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        자유방 #1
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        자유로운 대화 #1
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        #자유, #아무나
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-700 dark:text-white">
                      오전 3:10
                    </div>
                  </div>
                </li>
                <li className="hover:bg-gray-200 p-5 lg:p-5 sm:p-3">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src="https://plus.unsplash.com/premium_photo-1730828573938-003e14f210f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Neil image"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        자유방 #1
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        자유로운 대화 #1
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        #자유, #아무나
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-700 dark:text-white">
                      오전 3:10
                    </div>
                  </div>
                </li>
                <li className="hover:bg-gray-200 p-5 lg:p-5 sm:p-3">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src="https://plus.unsplash.com/premium_photo-1730828573938-003e14f210f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Neil image"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        자유방 #1
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        자유로운 대화 #1
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        #자유, #아무나
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-700 dark:text-white">
                      오전 3:10
                    </div>
                  </div>
                </li>
              </ul>
            </div> */}
          </section>
        </div>
      </main>
      <FooterComponent />
    </>
  );
};

export default Main;
