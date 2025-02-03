import axios from "axios";

export const getList = async () => {
  try {
    const result = await axios.get(`http://localhost:8080/room/list`);
    return result.data;
  } catch (error) {
    console.error("getList ERROR ! :", error);
    throw error;
  }
};

export const getMsgs = async (room_ID) => {
  console.log("id ++++++++" + room_ID);

  try {
    const result = await axios.get(
      `http://localhost:8080/room/msgs/${room_ID}`
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
    const result = await axios.post(
      "http://localhost:8080/room/createOpen",
      roomData
    );
    return result.data;
  } catch (error) {
    console.error("오픈 채팅방 생성 오류:", error);
    throw error;
  }
};
