import axios from "axios";

const baseUrl = "https://fusal-matching-backend-4808e80af663.herokuapp.com/";
export const apiGet = async (url) => {
  try {
    const result = await axios.get(baseUrl + url, {
      headers: {
        "Content-Type": `application/json`,
        // "ngrok-skip-browser-warning": "69420",
      },
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
};
