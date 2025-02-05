import axios from "axios";

export const fetchCountries = async () => {
  try {
    const response = await axios.get("http://localhost:8080/getNations");

    return response.data;
  } catch (error) {
    console.error("국가호출에러", error);
    return [];
  }
};
