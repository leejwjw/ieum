import { useEffect, useState } from "react";
import NationComponent from "../../components/info/NationComponent";
import LangComponent from "../../components/info/LangComponent";
import ChoiceComponent from "../../components/info/ChoiceComponent";
import PhotoComponent from "../../components/info/PhotoComponent";
import ModifyModal from "../../components/info/ModifyModal";
import AddressComponent from "../../components/info/AddressComponent";
import ToggleComponent from "../../components/info/ToggleComponent";
import { API_SERVER_HOST } from "../../api/kakaoApi";
import { getCookie } from "../../util/cookieUtil";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderComponent from "../../components/common/HeaderComponent";

const CookieUserInfo = getCookie("user");
const username = CookieUserInfo.username;

const initState = {
  photoPath: null,
  isPublic: true,
  nationName: "",
  lang: "kr",
  address: "",
  nickname: "",
  intro: "",
  interest: [],
  keyword: "",
};

const oldinitState = {
  photoPath: null,
  isPublic: true,
  nationName: "",
  lang: "kr",
  address: "",
  nickname: "",
  intro: "",
  interest: [],
  keyword: "",
};

const Modify = () => {
  const [userInfo, setUserInfo] = useState({ ...initState });
  const [result, setResult] = useState(null);
  const [olduser, setOldUser] = useState({ ...oldinitState });
  // false = input이 클릭되어 있지 않을 때, true = input이 클릭되어 있을 때
  const [isInputClicked, setIsInputClicked] = useState(false);
  const [isIntroClicked, setIsIntroClicked] = useState(false);
  const [isKeywordClicked, setIsKeywordClicked] = useState(false);

  const navigate = useNavigate();

  const header = {
    headers: {
      Authorization: `Bearer ${CookieUserInfo.accessToken}`,
    },
  };

  useEffect(() => {
    const searchBox = document.querySelector("nav.search_box");
    if (searchBox) {
      searchBox.style.display = "none";
    }
    // 사용자 정보를 가져오는 함수
    const APIUserInfo = async () => {
      try {
        const response = await axios.get(
          `${API_SERVER_HOST}/user/${username}/getUserInfo`,
          header
        );
        console.log("API Response:", response.data);
        setOldUser(response.data);
      } catch (err) {
        console.error("사용자 정보를 가져오는데 실패했습니다.", err);
      }
    };
    APIUserInfo();
  }, []);

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

  const handleToggleChange = (isPublic) => {
    console.log("공개 상태 변경:", isPublic);
    setUserInfo((prev) => ({ ...prev, isPublic: isPublic }));
  };
  const handlePhotoChange = (file) => {
    setUserInfo((prev) => ({ ...prev, photoPath: file }));
  };

  const handleClickSave = async () => {
    const missingFields = [];

    if (!userInfo.nationName) missingFields.push("국가를 선택해주세요.");
    if (!userInfo.lang) missingFields.push("언어를 선택해주세요.");
    if (!userInfo.address) missingFields.push("주소를 선택해주세요.");
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

    // ModifyDTO 형식의 JSON 데이터 구성
    const modifyData = {
      userName: username,
      photoPath: "", // 파일은 별도로 전송됨
      isPublic: userInfo.isPublic,
      nationName: nationCode,
      lang: userInfo.lang,
      address: userInfo.address,
      nickname: userInfo.nickname,
      intro: userInfo.intro,
      interest: userInfo.interest.join(","),
      keyword: userInfo.keyword,
    };

    // FormData 생성: JSON 데이터와 파일을 각각 첨부
    const formData = new FormData();
    formData.append("data", JSON.stringify(modifyData));
    if (userInfo.photoPath) {
      formData.append("file", userInfo.photoPath);
    }

    console.log("서버로 전송되는 데이터:", modifyData);
    console.log("서버로 전송되는 파일:", userInfo.photoPath);

    try {
      const response = await axios.put(
        `${API_SERVER_HOST}/user/${username}/modify`,
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
      navigate("/setting");
    } else {
      setResult(null);
    }
  };

  return (
    <>
      <HeaderComponent />
      {result && <ModifyModal callbackFn={closeModal} />}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-10 lg:px-8">
          <div className="mx-auto max-w-2xl p-8">
            <form>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <div className="grid place-items-center">
                    <img src="/medium_logo.png" />
                  </div>

                  <div className="text-center">
                    <h2 className="text-base/7 font-semibold text-gray-900"></h2>
                  </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                  <PhotoComponent
                    olduser={olduser}
                    header={header}
                    onPhotoChange={handlePhotoChange}
                  />
                  <ToggleComponent
                    olduser={olduser}
                    onToggleChange={handleToggleChange}
                  />
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <NationComponent
                      onNationNameChange={handleNationNameChange}
                    />
                    <LangComponent
                      olduser={olduser}
                      onLangChange={handleLangChange}
                    />
                    <AddressComponent
                      olduser={olduser}
                      onAddressChange={handleAddressChange}
                    />

                    <div className="col-span-full">
                      <label
                        htmlFor="nickname"
                        className="block text-lg font-medium text-gray-900 leading-6"
                      >
                        닉네임
                      </label>
                      <div className="mt-2">
                        <input
                          // 클릭될 때 작동
                          onFocus={() => {
                            setIsInputClicked(true);
                          }}
                          // 클릭되어 있지 않을 때 작동(input 이외의 영역이 클릭되었을 때)
                          onBlur={() => {
                            setIsInputClicked(false);
                          }}
                          placeholder={
                            isInputClicked === true ? "" : olduser.nick_NAME
                          }
                          type="text"
                          name="nickname"
                          id="nickname"
                          value={userInfo.nickname}
                          onChange={handleChange}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="intro"
                        className="block text-lg font-medium text-gray-900 leading-6"
                      >
                        한 줄 소개
                      </label>
                      <div className="mt-2">
                        <input
                          // 클릭될 때 작동
                          onFocus={() => {
                            setIsIntroClicked(true);
                          }}
                          // 클릭되어 있지 않을 때 작동(input 이외의 영역이 클릭되었을 때)
                          onBlur={() => {
                            setIsIntroClicked(false);
                          }}
                          placeholder={
                            isIntroClicked === true ? "" : olduser.intro
                          }
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
                        olduser={olduser}
                        onInterestChange={handleInterestChange}
                      />
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="keyword"
                        className="block text-lg font-medium text-gray-900 leading-6"
                      >
                        세부 관심사
                      </label>
                      <div className="mt-2">
                        <textarea
                          // 클릭될 때 작동
                          onFocus={() => {
                            setIsKeywordClicked(true);
                          }}
                          // 클릭되어 있지 않을 때 작동(input 이외의 영역이 클릭되었을 때)
                          onBlur={() => {
                            setIsKeywordClicked(false);
                          }}
                          placeholder={
                            isKeywordClicked === true ? "" : olduser.keyword
                          }
                          rows="5"
                          name="keyword"
                          id="keyword"
                          value={userInfo.keyword}
                          onChange={handleChange}
                          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
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
                  수정
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modify;
