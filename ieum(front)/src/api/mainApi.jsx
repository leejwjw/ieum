import axios from "axios";
import { getCookie } from "../util/cookieUtil";
const userInfo = getCookie("user");
const userToken = userInfo.accessToken;
const header = { headers: { Authorization: `Bearer ${userToken}` } };

export const fetchInterest = async (userName) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/user/interest/${userName}`,
      header
    );
    return response.data;
  } catch (error) {
    console.error("관심사 호출 에러:", error);
    return [];
  }
};
