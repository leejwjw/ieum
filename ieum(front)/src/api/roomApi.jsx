import axios from "axios";
import { getCookie } from "../util/cookieUtil";

const userInfo = getCookie("user");
const userToken = userInfo.accessToken;
console.log("userJWTToken: {}", userToken);

export const getList = async (userName) => {
  try {
    console.log(userName);
    const header = { headers: { Authorization: `Bearer ${userToken}` } };
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
export const getOpenRoomList = async () => {
  try {
    const header = { headers: { Authorization: `Bearer ${userToken}` } };
    const result = await axios.get(
      `http://localhost:8080/room/openList`,
      header
    );
    return result.data;
  } catch (error) {
    console.error("getList ERROR ! :", error);
    throw error;
  }
};

export const getMsgs = async (room_ID) => {
  console.log("id ++++++++" + userToken);
  try {
    const header = {
      headers: { Authorization: `Bearer ${userToken}` },
    };
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
export const createRoom = async (name) => {
  const result = await axios.post(`http://localhost:8080/room/create`, {
    name,
  });
  return result.data;
};
export const createOpenRoom = async (roomData) => {
  console.log(roomData);
  try {
    const header = {
      headers: { Authorization: `Bearer ${userToken}` },
    };
    const result = await axios.post(
      "http://localhost:8080/room/createOpen",
      roomData,
      header
    );
    return result.data;
  } catch (error) {
    console.error("오픈 채팅방 생성 오류:", error);
    throw error;
  }
};
