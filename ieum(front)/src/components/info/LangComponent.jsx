import { useState } from "react";

const languageOptions = [
  { code: "kr", name: "한국어" },
  { code: "en", name: "영어" },
  { code: "ja", name: "일본어" },
  { code: "ch", name: "중국어" },
];

const LangComponent = ({ olduser, onLangChange }) => {
  const [selected, setSelected] = useState("ko");
  const [isOpen, setIsOpen] = useState(false);
  {
    isOpen && (
      <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        {["한국어", "영어", "일본어"].map((lang) => (
          <li
            key={lang}
            className="px-4 py-2 hover:bg-indigo-100 cursor-pointer text-gray-900"
            onClick={() => {
              setSelected(lang);
              setIsOpen(false);
            }}
          >
            {lang}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className="sm:col-span-2">
      <label
        htmlFor="country"
        className="block text-lg font-medium text-gray-900 leading-6"
      >
        언어 선택
      </label>
      <div className="mt-2 grid grid-cols-1">
        <div className="relative">
          <button
            type="button"
            className="w-full appearance-none rounded-md bg-white py-2 pl-3 pr-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm flex justify-between items-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="mr-2">
              {languageOptions.find((lang) => lang.code === selected)?.name ||
                "한국어"}
              {/* 시간나면 default 언어 잡기 */}
            </span>
            <svg
              className=" w-5 h-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
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
          </button>

          {/* Custom Dropdown */}
          {isOpen && (
            <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
              {languageOptions.map((lang) => (
                <li
                  key={lang.code}
                  className="px-4 py-2 hover:bg-indigo-100 cursor-pointer text-gray-900"
                  onClick={() => {
                    onLangChange(lang.code);
                    setSelected(lang.code);
                    setIsOpen(false);
                  }}
                >
                  {lang.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default LangComponent;
