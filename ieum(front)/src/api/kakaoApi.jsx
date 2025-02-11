import axios from "axios";

// API서버 요청 기능
export const API_SERVER_HOST = "http://localhost:8080";

// 내 카카오 REST API 키
const REST_API_KEY = `44fb6350a18142052af362d26c9f5207`;

// Redirect URI
const REDIRECT_URI = `http://localhost:5173/kakao`;

// 카카오 인가 요청 경로
const AUTH_CODE_PATH = `https://kauth.kakao.com/oauth/authorize`;

// 카카오 Access Token 요청 경로
const ACCESS_TOKEN_URL = `https://kauth.kakao.com/oauth/token`;

// 카카오 인가 요청경로(링크) 크리에이터
export const getKakaoLoginLink = () => {
  const kakaoURL = `${AUTH_CODE_PATH}?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&prompt=login`; //
  return kakaoURL;
};

// 카카오 Access Token 요청
export const getAccessToken = async (authCode) => {
  const header = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  };
  const params = {
    grant_type: "authorization_code",
    client_id: REST_API_KEY,
    redirect_uri: REDIRECT_URI,
    code: authCode,
  };

  const result = await axios.post(ACCESS_TOKEN_URL, params, header);
  console.log(result.data);
  const accessToken = result.data.access_token;
  return accessToken;
};

// 백엔드로 카카오 AccessToken 전달 요청
export const getKakaoAccessToken = async (kakaoAccessToken) => {
  const result = await axios.get(
    `${API_SERVER_HOST}/api/auth/kakaoLogin?accessToken=${kakaoAccessToken}`
  );
  return result.data;
};
