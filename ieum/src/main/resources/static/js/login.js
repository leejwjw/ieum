// 카카오 앱 설정
const KAKAO_REST_API = '44fb6350a18142052af362d26c9f5207';  // 실제 카카오 REST API 키를 입력하세요.
const REDIRECT_URI = 'http://localhost:8080/home';  // 클라이언트의 Redirect URI

// 카카오 로그인 버튼 클릭 시 실행되는 함수
function redirectToKakaoLogin() {
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API}&redirect_uri=${REDIRECT_URI}`;
    window.location.href = KAKAO_AUTH_URL;
}

// 페이지 로드 시 실행되는 함수
const fetchKakaoData = async () => {
    // URL에서 'code' 파라미터 추출
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get('code');
    console.log("KakaoAuthCode: ", authCode)

    // 인가 코드가 없다면 오류 처리
    if (!authCode) {
        console.error('인가코드가 포함되어있지 않습니다.');
        return;
    }

    try {
        // 카카오에서 Access Token 요청
        const tokenResponse = await fetch('https://kauth.kakao.com/oauth/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                client_id: KAKAO_REST_API,
                redirect_uri: REDIRECT_URI,
                code: authCode
            }),
        });

        // (카카오 응답 형태)
        // "access_token": "ACCESS_TOKEN",       // 실제 Access Token 값
        // "token_type": "bearer",               // 토큰 유형 (보통 'bearer')
        // "refresh_token": "REFRESH_TOKEN",     // Refresh Token
        // "expires_in": 3600,                   // Access Token의 만료 시간 (초 단위)
        // "scope": "profile"                    // 허용된 권한 범위

        // 응답에서 Access Token 추출
        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;
        console.log("KakaoAccessToken: ", accessToken);

        // Access Token이 없으면 오류 처리
        if (!accessToken) {
            console.error('카카오 Access Token 발급에 실패했습니다.');
            return;
        }

        // 서버로 Access Token 전달하여 사용자 정보 JWT 토큰 요청
        const serverResponse = await fetch('http://localhost:8080/api/auth/getkakaoUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ accessToken }),
        });

        // 서버 응답 처리
        const serverData = await serverResponse.json();
        console.log('Server Response serverData:', serverData);  // JWT 토큰 확인
    } catch (error) {
        console.error('카카오 로그인 도중 오류가 발생 했습니다. :', error);
    }
};

// 페이지 로드 후 자동으로 kakaoLoginCallback 호출
window.onload = fetchKakaoData;
