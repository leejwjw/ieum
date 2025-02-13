import { useState } from "react";

const LogoutModal = ({ callbackFn }) => {
    const [isModalOpen, setIsModalOpen] = useState(true);

    const handleLogoutModal = () => {
        setIsModalOpen(false); // 먼저 상태 업데이트
        setTimeout(() => {
          callbackFn("Logout Success"); // 상태가 반영된 후 callbackFn 호출
        }, 0);
    };

    const handleCancleModal = () => {
        setIsModalOpen(false); // 먼저 상태 업데이트
        setTimeout(() => {
          callbackFn("Cancelled"); // 상태가 반영된 후 callbackFn 호출
        }, 0);
    };
      

    return (
        <>
            {isModalOpen && (
                <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="grid place-items-center">
                            <div className="mt-3">
                            <div className="mt-2 mb-8">
                                <img src="/register_complete.png" alt="Complete" />
                            </div>
                            </div>
                            <div className="grid place-items-center">
                            <h2 className="text-2xl font-semibold text-gray-900 text-center pb-4">
                                로그아웃 하시겠습니까?
                            </h2>
                            <p className="text-base font-semibold text-gray-900 text-center">
                                서비스를 다시 이용하시려면 로그인 해주셔야 합니다.
                            </p>
                            </div>
                        </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 flex justify-center sm:flex sm:flex-row-reverse sm:px-6">
                        <div className="sm:ml-3 sm:w-auto">
                            <button
                            type="button"
                            className="inline-flex w-full justify-center rounded-md bg-gray-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200"
                            onClick={handleCancleModal}
                            >
                            취소
                            </button>
                        </div>
                        <div className="mt-3 sm:mt-0 sm:w-auto">
                            <button
                            type="button"
                            className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                            onClick={handleLogoutModal}
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

export default LogoutModal;
