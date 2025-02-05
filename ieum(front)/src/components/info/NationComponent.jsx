import { useState, useEffect } from "react";
import { fetchCountries } from "../../api/infoApi"; // API 파일에서 import

const NationComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const loadCountries = async () => {
      const countryData = await fetchCountries();
      if (countryData.length > 0) {
        setCountries(countryData);
        setSelectedCountry(countryData[0]); // 기본값으로 첫 번째 국가 선택
      }
    };

    loadCountries();
  }, []);

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setIsModalOpen(false);
  };

  return (
    <div className="sm:col-span-1">
      {/* 국가 선택 라벨 */}
      <label
        htmlFor="country-flag"
        className="block text-lg font-medium text-gray-900 leading-6"
      >
        국가 선택
      </label>

      {/* 선택된 국가 입력 필드 (클릭 시 모달 열림) */}
      <div className="mt-2 grid grid-cols-1">
        <div
          className="col-start-1 row-start-1 w-full flex items-center justify-center gap-2 cursor-pointer rounded-md bg-white h-9 py-3 text-lg text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
          onClick={() => setIsModalOpen(true)}
        >
          {selectedCountry && (
            <img src={selectedCountry.flag} alt={selectedCountry.name} />
          )}
        </div>
        <svg
          className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* 국가 선택 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg w-80 p-6">
            <h2 className="text-lg font-semibold text-center mb-4">
              국가 선택
            </h2>
            <ul className="space-y-2">
              {countries.map((country) => (
                <li
                  key={country.code}
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelectCountry(country)}
                >
                  <img
                    src={country.flag}
                    alt={country.name}
                    className="w-6 h-4"
                  />
                  {country.name}
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
