import axios from "axios";
import jwtAxios from "../util/jwtUtil";
import { API_SERVER_HOST } from "./kakaoApi";
import { getCookie } from "../util/cookieUtil";
const userInfo = getCookie("user");
const userToken = userInfo.accessToken;
const header = { headers: { Authorization: `Bearer ${userToken}` } };
export const fetchCountries = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/getNations",
      header
    );

    return response.data;
  } catch (error) {
    console.error("국가호출에러", error);
    return [];
  }
};

// MyInfo 정보 등록
export const putOne = async (username, userInfo) => {
  const result = await jwtAxios.put(
    `${API_SERVER_HOST}/${username}/myInfo`,
    userInfo,
    header
  );
  return result.data;
};
