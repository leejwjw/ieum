import HeaderComponent from "../../components/common/HeaderComponent";
import FooterComponent from "../../components/common/FooterComponent";

const Main = () => {
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
                <div className="mt-2">
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 text-xs font-medium text-blue-700 rounded-lg hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="size-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M.676 6.941A12.964 12.964 0 0 1 10 3c3.657 0 6.963 1.511 9.324 3.941a.75.75 0 0 1-.008 1.053l-.353.354a.75.75 0 0 1-1.069-.008C15.894 6.28 13.097 5 10 5 6.903 5 4.106 6.28 2.106 8.34a.75.75 0 0 1-1.069.008l-.353-.354a.75.75 0 0 1-.008-1.053Zm2.825 2.833A8.976 8.976 0 0 1 10 7a8.976 8.976 0 0 1 6.499 2.774.75.75 0 0 1-.011 1.049l-.354.354a.75.75 0 0 1-1.072-.012A6.978 6.978 0 0 0 10 9c-1.99 0-3.786.83-5.061 2.165a.75.75 0 0 1-1.073.012l-.354-.354a.75.75 0 0 1-.01-1.05Zm2.82 2.84A4.989 4.989 0 0 1 10 11c1.456 0 2.767.623 3.68 1.614a.75.75 0 0 1-.022 1.039l-.354.354a.75.75 0 0 1-1.085-.026A2.99 2.99 0 0 0 10 13c-.88 0-1.67.377-2.22.981a.75.75 0 0 1-1.084.026l-.354-.354a.75.75 0 0 1-.021-1.039Zm2.795 2.752a1.248 1.248 0 0 1 1.768 0 .75.75 0 0 1 0 1.06l-.354.354a.75.75 0 0 1-1.06 0l-.354-.353a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    수다
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 text-xs font-medium text-red-900 rounded-lg hover:text-white border border-red-800 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm text-center me-2 mb-2 dark:border-red-600 dark:text-red-400 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-800"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="size-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M13.5 4.938a7 7 0 1 1-9.006 1.737c.202-.257.59-.218.793.039.278.352.594.672.943.954.332.269.786-.049.773-.476a5.977 5.977 0 0 1 .572-2.759 6.026 6.026 0 0 1 2.486-2.665c.247-.14.55-.016.677.238A6.967 6.967 0 0 0 13.5 4.938ZM14 12a4 4 0 0 1-4 4c-1.913 0-3.52-1.398-3.91-3.182-.093-.429.44-.643.814-.413a4.043 4.043 0 0 0 1.601.564c.303.038.531-.24.51-.544a5.975 5.975 0 0 1 1.315-4.192.447.447 0 0 1 .431-.16A4.001 4.001 0 0 1 14 12Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    운동/건강
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 text-xs font-medium text-green-700 rounded-lg hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="size-5"
                    >
                      <path d="M10.75 10.818v2.614A3.13 3.13 0 0 0 11.888 13c.482-.315.612-.648.612-.875 0-.227-.13-.56-.612-.875a3.13 3.13 0 0 0-1.138-.432ZM8.33 8.62c.053.055.115.11.184.164.208.16.46.284.736.363V6.603a2.45 2.45 0 0 0-.35.13c-.14.065-.27.143-.386.233-.377.292-.514.627-.514.909 0 .184.058.39.202.592.037.051.08.102.128.152Z" />
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-6a.75.75 0 0 1 .75.75v.316a3.78 3.78 0 0 1 1.653.713c.426.33.744.74.925 1.2a.75.75 0 0 1-1.395.55 1.35 1.35 0 0 0-.447-.563 2.187 2.187 0 0 0-.736-.363V9.3c.698.093 1.383.32 1.959.696.787.514 1.29 1.27 1.29 2.13 0 .86-.504 1.616-1.29 2.13-.576.377-1.261.603-1.96.696v.299a.75.75 0 1 1-1.5 0v-.3c-.697-.092-1.382-.318-1.958-.695-.482-.315-.857-.717-1.078-1.188a.75.75 0 1 1 1.359-.636c.08.173.245.376.54.569.313.205.706.353 1.138.432v-2.748a3.782 3.782 0 0 1-1.653-.713C6.9 9.433 6.5 8.681 6.5 7.875c0-.805.4-1.558 1.097-2.096a3.78 3.78 0 0 1 1.653-.713V4.75A.75.75 0 0 1 10 4Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    재태크
                  </button>
                </div>
              </div>
            </div>
            <div className="grid gap-8 lg:grid-cols-2 h-px-600">
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
            </div>
          </section>
        </div>
      </main>
      <FooterComponent />
    </>
  );
};

export default Main;
