import axios from "axios";
import { getCookie } from "../util/cookieUtil";
const userInfo = getCookie("user");
const userToken = userInfo.accessToken;
const header = { headers: { Authorization: `Bearer ${userToken}` } };
export const fetchCountries = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8080/user/getNations",
      header
    );

    return response.data;
  } catch (error) {
    console.error("국가호출에러", error);
    return [];
  }
};
