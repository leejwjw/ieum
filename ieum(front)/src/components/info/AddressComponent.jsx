import { useState } from "react";
import DaumPostcode from "react-daum-postcode";

const AddressComponent = ({ olduser, onAddressChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [IsAddressClicked, setIsAddressClicked] = useState(false);

  const handleComplete = (data) => {
    setAddress(data.address); // 선택한 주소 저장
    console.log("address 컴포넌트에서 선택한 주소", data.address);
    setIsOpen(false); // 모달 닫기
    onAddressChange(data.address);
  };

  return (
    <div className="col-span-full">
      <label
        htmlFor="address"
        className="block text-lg font-medium text-gray-900 leading-6"
      >
        주소 입력
      </label>
      <div className="mt-2 flex gap-2">
        <input
          // 클릭될 때 작동
          onFocus={() => {
            setIsAddressClicked(true);
          }}
          // 클릭되어 있지 않을 때 작동(input 이외의 영역이 클릭되었을 때)
          onBlur={() => {
            setIsAddressClicked(false);
          }}
          placeholder={IsAddressClicked === true ? "" : olduser.address}
          type="text"
          id="address"
          name="address"
          value={address}
          readOnly
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
        />
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="px-2 py-3 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 whitespace-nowrap"
        >
          주소 검색
        </button>
      </div>

      {/* 주소 검색 모달 */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-[500px] h-[450px] max-w-2xl p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-center mb-4">
              주소 검색
            </h2>
            <div className="h-[300px] overflow-auto">
              <DaumPostcode onComplete={handleComplete} />
            </div>
            <button
              className="w-full mt-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              onClick={() => setIsOpen(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressComponent;
