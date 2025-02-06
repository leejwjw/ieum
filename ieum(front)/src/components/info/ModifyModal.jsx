import { useState } from "react";

const ModifyModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="grid place-items-center">
                <div className="mt-3">
                  <div className="mt-2 mb-20">
                    <img src="/register_complete.png" />
                  </div>
                </div>

                <div className="grid place-items-center">
                  <h2 className="text-2xl font-semibold text-gray-900 text-center pb-12">
                    수정 완료 되었습니다!
                  </h2>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 justify-center sm:flex sm:flex-row-reverse sm:px-6">
              <div>
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                  onClick={handleCloseModal}
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModifyModal;
