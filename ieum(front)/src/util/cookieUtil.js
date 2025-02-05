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
  return cookies.get(name); // 쿠키 값 반환
};

// 쿠키 삭제 함수
export const removeCookie = (name, path = "/") => {
  cookies.remove(name, { path }); // 저장된 path에서 쿠키 삭제
};
