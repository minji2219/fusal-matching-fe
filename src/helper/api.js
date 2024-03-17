import axios from "axios";

const baseUrl = "https://986b-121-147-100-85.ngrok-free.app/";
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

export const apiPost = async (url, postData) => {
  try {
    const result = await axios.post(baseUrl + url, {
      ...postData,
      headers: {
        "Content-Type": `application/json`,
        "ngrok-skip-browser-warning": "69420",
      },
    });
    return result.data;
  } catch (e) {
    console.log(e);
    throw new Error();
  }
};
