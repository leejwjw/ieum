const BannerComponent = () => {
  return (
    <section>
      <div className="grid gap-8 lg:grid-cols-2">
        <div
          id="carouselExampleCaptions"
          className="relative col-span-full divide-y divide-gray-200 dark:divide-gray-700"
          data-twe-carousel-init
          data-twe-carousel-slide
        >
          <div className="relative w-full overflow-hidden after:clear-both after:block after:content-[''] h-150px  pb-10">
            <div
              className="relative float-left -me-[100%] w-full transition-transform duration-[500ms] ease-in-out motion-reduce:transition-none"
              data-twe-carousel-active
              data-twe-carousel-item
            >
              <img
                src="/logo.png"
                className="block mx-auto object-cover"
                alt="..."
              />
              <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block"></div>
            </div>

            <div
              className="relative float-left -me-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
              data-twe-carousel-item
            >
              <img
                src="https://tecdn.b-cdn.net/img/Photos/Slides/img%20(22).jpg"
                className="block w-full h-[150px] object-cover"
                alt="..."
              />
              <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
                <h5 className="text-xl">Second slide label</h5>
                <p>
                  Some representative placeholder content for the second slide.
                </p>
              </div>
            </div>

            <div
              className="relative float-left -me-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
              data-twe-carousel-item
            >
              <img
                src="https://tecdn.b-cdn.net/img/Photos/Slides/img%20(23).jpg"
                className="block w-full h-[150px] object-cover"
                alt="..."
              />
              <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
                <h5 className="text-xl">Third slide label</h5>
                <p>
                  Some representative placeholder content for the third slide.
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
  );
};

export default BannerComponent;
