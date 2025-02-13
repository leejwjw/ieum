import { useNavigate, useSearchParams } from "react-router-dom";
import { getAccessToken, getKakaoAccessToken } from "../../api/kakaoApi";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../slices/loginSlice";

const KakaoRedirectPage = () => {
  const [searchParams] = useSearchParams();
  const authCode = searchParams.get("code"); // 인가코드

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 특정 경로로 페이지 이동
  const moveToPath = useCallback(
    (path) => {
      navigate({ pathname: path }, { replace: true });
    },
    [navigate] // navigate는 React Router에서 제공하는 안정적인 참조
  );
  useEffect(() => {
    // 카카오 Access Token 요청
    getAccessToken(authCode).then((accessToken) => {
      console.log("Kakao accessToken: ", accessToken);
      // 카카오 Access Token 서버로 전달, 카카오회원정보 조회를 요청
      getKakaoAccessToken(accessToken).then((userInfo) => {
        console.log("Kakao UserInfo: ", userInfo); // API서버에서 응답받은 회원정보(claims) 데이터
        // 리액트상 로그인 처리
        dispatch(login(userInfo));

        if (userInfo && userInfo.isUser) {
          // 이미 가입한 소셜회원(=일반회원 이미 처리됨)인 경우
          moveToPath("/main");
        } else {
          // 처음 소셜회원으로 로그인(가입)인 경우
          moveToPath("/myinfo");
        }
      });
    });
  }, [authCode, moveToPath, dispatch]);

  return (
    <div>
      <div> Kakao Login Redirect Page </div>
      {/* <div>{authCode}</div> */}
    </div>
  );
};

export default KakaoRedirectPage;
