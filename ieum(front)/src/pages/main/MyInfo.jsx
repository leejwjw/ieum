import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { putOne } from "../../api/infoApi";
import NationComponent from "../../components/info/NationComponent";
import LangComponent from "../../components/info/LangComponent";
import AddressComponent from "../../components/info/AddressComponent";
import InterestModal from "../../components/info/InterestModal";
import ChoiceComponent from "../../components/info/ChoiceComponent";
import { getCookie } from "../../util/cookieUtil";
import axios from "axios";
import { API_SERVER_HOST } from "../../api/kakaoApi";

const CookieUserInfo = getCookie("user");
const username = CookieUserInfo.username;

const initState = {
  nationName: "",
  lang: "",
  address: "",
  intro: "",
  interest: [],
  keyword: "",
};

const MyInfo = () => {
  const [userInfo, setUserInfo] = useState({ ...initState });
  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  const header = {
    headers: {
      Authorization: `Bearer ${CookieUserInfo.accessToken}`,
      "Content-Type": "application/json",
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleInterestChange = (interests) => {
    setUserInfo((prev) => ({ ...prev, interest: interests }));
  };

  const handleNationNameChange = (nation) => {
    console.log("선택된 국가:", nation); // 여기서 국가 정보를 확인할 수 있음
    setUserInfo((prev) => ({ ...prev, nationName: nation }));
  };

  const handleLangChange = (languages) => {
    setUserInfo((prev) => ({ ...prev, lang: languages }));
  };
  const handleAddressChange = (addr) => {
    console.log("상위 컴포넌트로 넘어온: ", addr);
    setUserInfo((prev) => ({ ...prev, address: addr }));
    console.log("저장된 주소: ", setUserInfo);
  };

  const handleClickSave = async () => {
    const missingFields = [];
    console.log(username);
    console.log(userInfo.keyword);
    console.log(userInfo.interest);
    console.log(userInfo.intro);

    if (!userInfo.nationName) missingFields.push("국가를 선택해주세요.");
    if (!userInfo.lang) missingFields.push("언어를 선택해주세요.");
    if (!userInfo.intro) missingFields.push("한 줄 소개를 입력해주세요.");
    if (!userInfo.intro) missingFields.push("한 줄 소개를 입력해주세요.");
    if (userInfo.interest.length === 0)
      missingFields.push("최소 1개의 관심사를 선택해주세요.");
    if (!userInfo.keyword) missingFields.push("세부 관심사를 입력해주세요.");

    if (missingFields.length > 0) {
      alert(missingFields.join("\n"));
      return;
    }

    // 서버로 데이터 전송

    const nationCode = userInfo.nationName.nation_NAME;

    const formData = {
      userName: username,
      lang: userInfo.lang,
      address: userInfo.address,
      intro: userInfo.intro,
      interest: userInfo.interest.join(","),
      keyword: userInfo.keyword,
      nationName: nationCode,
    };

    console.log("nationCode", nationCode);
    console.log("address", userInfo.address);

    console.log("서버로 전송되는 데이터:", formData);

    try {
      const response = await axios.post(
        `${API_SERVER_HOST}/user/${username}/myinfo`,
        formData,
        header
      );

      if (response.status === 200) {
        console.log("저장 성공:", response.data);
        setResult("Save Success");
      } else {
        throw new Error("서버 오류로 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("저장 실패:", error);
      setResult("Save Fail");
    }
  };

  const closeModal = () => {
    if (result === "Save Success") {
      navigate("/main");
    } else {
      setResult(null);
    }
  };

  return (
    <>
      {result && <InterestModal callbackFn={closeModal} />}
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
                    <NationComponent
                      onNationNameChange={handleNationNameChange}
                    />
                    <LangComponent onLangChange={handleLangChange} />
                    <AddressComponent onAddressChange={handleAddressChange} />
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
                          value={userInfo.intro}
                          onChange={handleChange}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="interest"
                        className="block text-lg font-medium text-gray-900 leading-6 mb-2"
                      >
                        관심사
                      </label>
                      <ChoiceComponent
                        onInterestChange={handleInterestChange}
                      />
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="detailkeyword"
                        className="block text-lg font-medium text-gray-900 leading-6"
                      >
                        세부 관심사 설명
                      </label>
                      <div className="mt-2">
                        <textarea
                          rows="5"
                          name="keyword"
                          id="keyword"
                          value={userInfo.keyword}
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
