import axios from "axios";
const URL = process.env.NEXT_PUBLIC_URL;
const API_URL = `${URL}/dateplan`; // Change with your actual server API URL

export const predict = async (form: any) => {
  const response = await axios.post(`${API_URL}/, predict`);
  return response.data;
};
