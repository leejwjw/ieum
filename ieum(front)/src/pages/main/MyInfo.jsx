import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { putOne } from "../../api/infoApi";
import NationComponent from "../../components/info/NationComponent";
import LangComponent from "../../components/info/LangComponent";
import AddressComponent from "../../components/info/AddressComponent"; // 주소 입력 컴포넌트 추가
import ChoiceComponent from "../../components/info/ChoiceComponent";
import InterestModal from "../../components/info/InterestModal"; // 결과 모달

const initState = {
  userName: "",
  nationName: "",
  lang: "",
  introduce: "",
  interest: [],
  detailInter: "",
};

const MyInfo = () => {
  const [userInfo, setUserInfo] = useState({ ...initState });
  const [result, setResult] = useState(null); // 결과 모달
  const [errors, setErrors] = useState([]); // 에러 메시지 저장
  const navigate = useNavigate(); // 페이지 전환을 위한 useNavigate 사용

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleClickSave = () => {
    // 필수 항목 검증
    const errorMessages = [];

    if (!userInfo.nationName) errorMessages.push("국가를 선택해주세요.");
    if (!userInfo.lang) errorMessages.push("언어를 선택해주세요.");
    if (!userInfo.introduce) errorMessages.push("한 줄 소개를 입력해주세요.");
    if (userInfo.interest.length === 0)
      errorMessages.push("최소 1개의 관심사를 선택해주세요.");
    if (!userInfo.detailInter)
      errorMessages.push("세부 관심사를 입력해주세요.");

    if (errorMessages.length > 0) {
      setErrors(errorMessages); // 에러 메시지 설정
      return;
    }

    const formData = new FormData();
    formData.append("nationName", userInfo.nationName);
    formData.append("lang", userInfo.lang);
    formData.append("introduce", userInfo.introduce);
    formData.append("interest", userInfo.interest.join(", ")); // interest 배열을 string으로 변환하여 전송
    formData.append("detailInter", userInfo.detailInter);

    // API 호출
    putOne("userName", formData)
      .then((data) => {
        console.log(data);
        setResult("Save Success"); // 결과 표시
      })
      .catch((error) => {
        console.error("Error saving data:", error);
        setResult("Save Fail"); // 실패 시 결과 표시
      });
  };

  const closeModal = () => {
    setResult(null); // 모달 닫기
    if (result === "Save Success") {
      navigate("/main"); // 저장 성공 시 /main으로 이동
    } else {
      alert("저장 중 오류가 발생 했습니다. 다시 입력해 주세요.");
    }
  };

  return (
    <>
      {result && <InterestModal callbackFn={closeModal} />}

      {/* 필수 항목 에러 메시지 표시 */}
      {errors.length > 0 && (
        <div className="bg-red-100 text-red-700 p-4 mb-4">
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-10 lg:px-8">
          <div className="mx-auto max-w-2xl p-8">
            <form>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <div className="grid place-items-center">
                    <img src="/medium_logo.png" alt="Logo" />
                  </div>
                  <div className="text-center">
                    <h2 className="text-2xl font-semibold text-gray">
                      더 나은 서비스를 위해 몇 가지 작성 부탁드릴게요!
                    </h2>
                  </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <NationComponent />
                    <LangComponent />
                    <AddressComponent />
                    <div className="col-span-full">
                      <label
                        htmlFor="introduce"
                        className="block text-lg font-medium text-gray-900 leading-6"
                      >
                        한 줄 소개
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="introduce"
                          id="introduce"
                          value={userInfo.introduce}
                          onChange={handleChange}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                        />
                      </div>
                    </div>

                    {/* ChoiceComponent에서 관심사 선택 */}
                    <div className="col-span-full">
                      <label
                        htmlFor="interest"
                        className="block text-lg font-medium text-gray-900 leading-6"
                      >
                        관심사
                      </label>
                      <ChoiceComponent
                        selectedInterests={userInfo.interest}
                        onChange={(newInterests) => {
                          setUserInfo({
                            ...userInfo,
                            interest: newInterests,
                          });
                        }}
                      />
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="detailInter"
                        className="block text-lg font-medium text-gray-900 leading-6"
                      >
                        세부 관심사 설명
                      </label>
                      <div className="mt-2">
                        <textarea
                          rows="5"
                          name="detailInter"
                          id="detailInter"
                          value={userInfo.detailInter}
                          onChange={handleChange}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
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
                  onClick={handleClickSave}
                >
                  확인
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyInfo;
