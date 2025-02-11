import { useState } from "react";

const PhotoComponent = ({ onPhotoChange }) => {
  const defaultPhoto =
    "https://plus.unsplash.com/premium_photo-1730828573938-003e14f210f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  const [photo, setPhoto] = useState(defaultPhoto);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 미리보기용 FileReader 실행
      const reader = new FileReader();
      reader.onload = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);

      // 선택된 파일 객체를 부모 컴포넌트에 전달
      // 부모에서는 이 파일 객체를 FormData에 담아 백엔드 API로 전송하면,
      // 백엔드에서 Public/profile에 저장하는 로직(기존 이미지 삭제, 암호화 등)을 수행할 수 있음.
      onPhotoChange(file);
    }
  };

  return (
    <section>
      <div className="grid grid-cols-1 pl-4 pr-4">
        <div className="pt-10 pb-5 flex justify-center">
          <div className="flex items-center space-x-10 rtl:space-x-reverse">
            <div className="flex flex-shrink-0 -space-x-8 space-y-20 rtl:space-x-reverse">
              <img
                className="w-[150px] h-[150px] rounded-full"
                src={photo}
                alt="Uploaded Preview"
              />
            </div>
          </div>
          <div
            className="flex items-end text-base bg-blue-500 font-semibold text-gray-700 dark:text-white relative h-full cursor-pointer"
            onClick={() => document.getElementById("photoInput").click()}
          >
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
      <input
        type="file"
        id="photoInput"
        accept="image/*"
        className="hidden"
        onChange={handlePhotoChange}
      />
    </section>
  );
};

export default PhotoComponent;
