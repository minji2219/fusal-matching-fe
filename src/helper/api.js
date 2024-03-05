import axios from "axios";

const baseUrl = "https://fusal-matching-backend-7fbb15cd8430.herokuapp.com/";
export const apiGet = async (url) => {
  try {
    const result = await axios.get(baseUrl + url, {
      headers: {
        "Content-Type": `application/json`,
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
      },
    });
    return result.data;
  } catch (e) {
    console.log(e);
    throw new Error();
  }
};
