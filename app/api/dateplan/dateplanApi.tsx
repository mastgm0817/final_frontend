import axios from "axios";

const URL = process.env.NEXT_PUBLIC_URL;
const API_URL = URL + "/predict";

export const predict = async (formData: any, token: any) => {
  const response = await axios.post(API_URL, JSON.stringify(formData), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export default predict;
