import axios from "axios";
import { getCookie } from "../util/cookieUtil";
const userInfo = getCookie("user");
const userToken = userInfo.accessToken;
const header = { headers: { Authorization: `Bearer ${userToken}` } };

export const fetchInterest = async (userName) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/user/interest/${userName}`,
      { headers: { Authorization: `Bearer ${getCookie("user")?.accessToken}` } }
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("관심사 호출 에러:", error);
    return [];
  }
};
export const fetchUsersByInterest = async (userInterestId) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/user/list/${userInterestId}`,
      { headers: { Authorization: `Bearer ${getCookie("user")?.accessToken}` } }
    );
    return response.data;
  } catch (error) {
    console.error("유저 리스트 호출 에러:", error);
    return [];
  }
};

export const fetchSearchResults = async (searchTerm) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/user/search/${searchTerm}`,
      { headers: { Authorization: `Bearer ${getCookie("user")?.accessToken}` } }
    );
    return response.data;
  } catch (error) {
    console.error("검색 호출 에러:", error);
    return [];
  }
};
