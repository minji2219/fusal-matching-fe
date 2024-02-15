import axios from "axios";

const baseUrl = "https://6f2b-121-147-100-85.ngrok-free.app";
export const apiGet = async (url) => {
  try {
    const result = await axios.get(baseUrl + url, {
      headers: {
        "Content-Type": `application/json`,
        "ngrok-skip-browser-warning": "69420",
      },
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
};
