const PhotoComponent = () => {
  return (
    <section className="">
      <div className="grid grid-cols-1 pl-4 pr-4">
        <div className="pt-10 pb-5 flex justify-center">
          <div className="flex items-center space-x-10 rtl:space-x-reverse">
            <div className="flex flex-shrink-0 -space-x-8 space-y-20 rtl:space-x-reverse">
              <img
                className="w-[150px] h-[150px] rounded-full"
                src="https://plus.unsplash.com/premium_photo-1730828573938-003e14f210f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Neil image"
              />
            </div>
          </div>
          <div className="flex items-end text-base bg-blue-500 font-semibold text-gray-700 dark:text-white relative h-full">
            <div className="size-11 absolute bottom-0 right-0">
              <div className="size-11 p-3 inline-flex items-center justify-center text-xs font-bold text-white bg-blue-500 border-2 border-white rounded-full dark:border-blue-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoComponent;
