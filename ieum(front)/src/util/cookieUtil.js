import { Cookies } from "react-cookie";

const cookies = new Cookies();

// 쿠키 생성 함수
export const setCookie = (name, value, days) => {
  const expires = new Date();
  expires.setUTCDate(expires.getUTCDate() + days); // 만료일 설정

  return cookies.set(name, value, { path: "/", expires: expires });
};

// 쿠키 조회 함수
export const getCookie = (name) => {
  const cookie = cookies.get(name);
  console.log(`쿠키 값: ${cookie}`); // 반환 값 확인
  return cookie;
};

// 쿠키 삭제 함수
export const removeCookie = (name, path = "/") => {
  cookies.remove(name, { path }); // 저장된 path에서 쿠키 삭제
};
