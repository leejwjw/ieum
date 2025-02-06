import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getKakaoAccessToken } from "../api/kakaoApi";
import { getCookie, setCookie, removeCookie } from "../util/cookieUtil";

// 초기 상태 설정: 쿠키에서 사용자 정보를 불러오거나 초기화
const initState = getCookie("user") || { email: "", nickname: "" };

// Access Token으로 사용자 정보 가져오는 비동기 작업
export const fetchUserInfo = createAsyncThunk(
  "fetchUserInfo",
  async (accessToken) => {
    const userInfo = await getKakaoAccessToken(accessToken); // API 호출
    return userInfo; // 결과 반환
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: initState,
  reducers: {
    // 로그인: 사용자 정보를 상태와 쿠키에 저장
    login(state, action) {
      const userData = action.payload;
      setCookie("user", JSON.stringify(userData), 1); // 쿠키에 1일간 저장
      return userData;
    },
    // 로그아웃: 상태와 쿠키 초기화
    logout() {
      removeCookie("user"); // 쿠키 삭제
      return { email: "", nickname: "" }; // 초기 상태로 복구
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        const userData = action.payload;
        if (!userData.error) {
          setCookie("user", JSON.stringify(userData), 1); // 쿠키 저장
        }
        return userData;
      })
      .addCase(fetchUserInfo.rejected, () => {
        console.error("카카오 로그인 실패!");
        return { email: "", nickname: "" }; // 초기화
      });
  },
});

// 액션 생성자와 리듀서 내보내기
export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;
