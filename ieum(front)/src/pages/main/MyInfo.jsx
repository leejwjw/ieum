import { useState } from "react";
import NationComponent from "../../components/info/NationComponent";
import LangComponent from "../../components/info/LangComponent";
import ChoiceComponent from "../../components/info/ChoiceComponent";
import InterestModal from "../../components/info/InterestModal";
import AddressComponent from "../../components/info/AddressComponent"; // 주소 입력 컴포넌트 추가

const MyInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-2xl p-8">
          <form>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <div className="grid place-items-center">
                  <img src="/medium_logo.png" />
                </div>
                <div className="text-center">
                  <h2 className="text-base/7 font-semibold text-gray-900"></h2>
                </div>
              </div>

              <div className="border-b border-gray-900/10 pb-12">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-gray">
                    더 나은 서비스를 위해 몇 가지 작성 부탁드릴게요!
                  </h2>
                </div>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <NationComponent />
                  <LangComponent />
                  <AddressComponent />
                  <div className="col-span-full">
                    <label
                      htmlFor="intro"
                      className="block text-lg font-medium text-gray-900 leading-6"
                    >
                      한 줄 소개
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="intro"
                        id="intro"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                      />
                    </div>
                  </div>
                  <ChoiceComponent />
                  <div className="col-span-full">
                    <label
                      htmlFor="interest"
                      className="block text-lg font-medium text-gray-900 leading-6"
                    >
                      세부 관심사
                    </label>
                    <div className="mt-2">
                      <textarea
                        rows="5"
                        name="interest"
                        id="interest"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-x-6">
              <button
                type="button"
                className="px-3 py-2 text-sm font-medium text-blue-700 rounded-lg border border-blue-900 hover:text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                onClick={handleOpenModal}
              >
                확인
              </button>
            </div>
          </form>
        </div>
      </div>
      {isModalOpen && <InterestModal />}
    </div>
  );
};

export default MyInfo;
