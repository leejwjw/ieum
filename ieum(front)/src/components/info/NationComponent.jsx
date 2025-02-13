import { useState, useEffect } from "react";
import { fetchCountries } from "../../api/infoApi"; // API 파일에서 import

const NationComponent = ({ olduser, onNationNameChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const loadCountries = async () => {
      const countryData = await fetchCountries();
      console.log("불러온 국가 데이터:", countryData); //  중간에 countries 출력

      if (countryData.length > 0) {
        setCountries(countryData);
        setSelectedCountry(countryData[47]); // 기본값: 첫 번째 국가
        onNationNameChange(countryData[47]); // 기본값: 상위 컴포넌트로 전달.
      }
    };

    loadCountries();
  }, []);

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);

    // 상위 컴포넌트로 선택된 국가 객체를 전달.
    onNationNameChange(country);

    setIsModalOpen(false);
  };

  return (
    <div className="sm:col-span-1">
      {/* 국가 선택 라벨 */}
      <label className="block text-lg font-medium text-gray-900 leading-6">
        국가 선택
      </label>

      {/* 선택된 국가 입력 필드 (클릭 시 모달 열림) */}
      <div className="mt-2">
        <div
          className="w-full flex items-center justify-center gap-2 cursor-pointer rounded-md bg-white h-9 px-4 text-lg text-gray-900 outline outline-1 outline-gray-300 focus:outline-indigo-600"
          onClick={() => setIsModalOpen(true)}
        >
          {selectedCountry ? (
            <>
              <img
                src={selectedCountry.flAG}
                alt={selectedCountry.nation_NAME}
                className="w-6 h-4"
              />
            </>
          ) : (
            <span>국가를 선택해주세요</span>
          )}
        </div>
      </div>

      {/* 국가 선택 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg w-100 p-6 max-h-[80vh] overflow-y-auto">
            <h2 className="text-lg font-semibold text-center mb-4">
              국가 선택
            </h2>
            <ul className="grid grid-cols-5 gap-4">
              {countries.map((country) => (
                <li
                  key={country.code}
                  className="flex flex-col items-center gap-2 p-1 rounded-md hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelectCountry(country)}
                >
                  <img
                    src={country.flAG}
                    alt={country.nation_name}
                    className="w-8 h-6"
                  />
                  <span className="text-xs text-center">
                    {country.nation_name}
                  </span>
                </li>
              ))}
            </ul>
            <button
              className="w-full mt-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              onClick={() => setIsModalOpen(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NationComponent;
