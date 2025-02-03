import { useEffect } from "react";

// 카카오 앱 설정
const KAKAO_REST_API = "44fb6350a18142052af362d26c9f5207"; // 실제 카카오 REST API 키를 입력
const REDIRECT_URI = "http://localhost:5173/roomList"; // 클라이언트의 Redirect URI

// 카카오 로그인 버튼 클릭 시 실행되는 함수
const redirectToKakaoLogin = () => {
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API}&redirect_uri=${REDIRECT_URI}`;
  window.location.href = KAKAO_AUTH_URL;
};

// 카카오 로그인 후 데이터 처리 함수
const fetchKakaoData = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const authCode = urlParams.get("code");
  console.log("KakaoAuthCode: ", authCode);

  if (!authCode) {
    console.log("인가코드가 없습니다. 다시 시도해주세요.");
    return;
  }

  // 이미 처리된 인가 코드인지 확인
  const isProcessed = localStorage.getItem("kakaoAuthProcessed");
  if (isProcessed) {
    console.log("이미 로그인 처리가 완료되었습니다.");
    return; // 이미 로그인 처리가 완료되었으면 더 이상 요청하지 않음
  }

  // 처리 후 상태 저장
  localStorage.setItem("kakaoAuthProcessed", "true");

  try {
    // 카카오에서 Access Token 요청
    const tokenResponse = await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: KAKAO_REST_API,
        redirect_uri: REDIRECT_URI,
        code: authCode,
      }),
    });

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;
    console.log("KakaoAccessToken: ", accessToken);

    if (!accessToken) {
      console.log("카카오 Access Token 발급에 실패했습니다.");
      return;
    }

    // 서버로 Access Token 전달하여 사용자 정보 JWT 토큰 요청
    const serverResponse = await fetch(
      "http://localhost:8080/api/auth/getkakaoUser",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken }),
      }
    );

    // 서버 응답 처리
    const serverData = await serverResponse.json();
    console.log("Server Response:", serverData); // JWT 토큰 확인
  } catch (error) {
    console.error("카카오 로그인 도중 오류가 발생했습니다: ", error);
    alert("로그인 과정에서 오류가 발생했습니다.");
  }
};

const Home = () => {
  useEffect(() => {
    // fetchKakaoData 함수 호출
    fetchKakaoData();
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  return (
    <div>
      <a onClick={redirectToKakaoLogin}>
        <img src="/kakao_login.png" alt="카카오 로그인 버튼" />
      </a>
    </div>
  );
};

export default Home;
