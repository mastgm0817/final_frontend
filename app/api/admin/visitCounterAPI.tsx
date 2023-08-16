import axios from "axios";
const URL = process.env.NEXT_PUBLIC_URL;
const API_URL = `${URL}/counter`;

export const counter = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
export default counter;
