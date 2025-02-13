import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToggleSwitch = ({ olduser, initialValue = true, onToggleChange }) => {
  const [isPublic, setIsPublic] = useState(initialValue);

  const handleChange = () => {
    const newValue = !isPublic;
    setIsPublic(newValue);
    // 토스트 알림 표시 (상태값에 따라 메시지 변경)
    toast(`${newValue ? "전체공개" : "비공개"}로 변경되었습니다.`);
    if (onToggleChange) {
      onToggleChange(newValue);
    }
  };

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex justify-center text-blue-500 font-bold">
        <label className="inline-flex items-center cursor-pointer pl-2">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={isPublic}
            onChange={handleChange}
          />
          <div
            className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-0 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 
          peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
          peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] 
          after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
          dark:border-gray-600 peer-checked:bg-blue-600"
          ></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            {isPublic ? "전체공개" : "비공개"}
          </span>
        </label>
      </div>
    </>
  );
};

export default ToggleSwitch;
