import axios from "axios";
import { getCookie } from "../util/cookieUtil";

const userInfo = getCookie("user");

const userToken = userInfo.accessToken;
console.log("userJWTToken: {}", userToken);
const header = { headers: { Authorization: `Bearer ${userToken}` } };

export const getList = async (userName) => {
  try {
    const result = await axios.get(
      `http://localhost:8080/room/list/${userName}`,
      header
    );
    return result.data;
  } catch (error) {
    console.error("getList ERROR ! :", error);
    throw error;
  }
};
export const getListDetail = async (userName) => {
  try {
    const result = await axios.get(
      `http://localhost:8080/room/listDetail/${userName}`,
      header
    );
    return result.data;
  } catch (error) {
    console.error("getList ERROR ! :", error);
    throw error;
  }
};

export const getMsgs = async (room_ID) => {
  try {
    const result = await axios.get(
      `http://localhost:8080/room/msgs/${room_ID}`,
      header
    );
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.error("getMsgs ERROR ! :", error);
    throw error;
  }
};
export const createRoom = async ({ user1, user2 }) => {
  try {
    const result = await axios.post(
      "http://localhost:8080/room/create",
      {
        user1,
        user2,
      },
      header
    );
    return result.data;
  } catch (error) {
    console.error("채팅방 생성 오류:", error);
    throw error;
  }
};
