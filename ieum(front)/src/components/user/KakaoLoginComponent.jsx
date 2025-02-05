import { Link } from "react-router-dom";
import { getKakaoLoginLink } from "../../api/kakaoApi";
import kakaoLogin from "../../assets/kakao_login_medium_wide.png";

const KakaoLoginComponent = () => {
  const link = getKakaoLoginLink();

  return (
    <div>
      <div className="mt-6 flex flex-col items-center">
        <Link
          to={link}
          className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900  hover:bg-gray-50 focus-visible:ring-transparent"
        >
          <img src={kakaoLogin} alt="카카오 로그인 버튼" />
        </Link>
      </div>
    </div>
  );
};

export default KakaoLoginComponent;
