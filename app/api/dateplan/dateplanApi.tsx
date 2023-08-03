import axios from 'axios';
const API_URL = "http://localhost:8080/dateplan"; // Change with your actual server API URL

export const predict = async (form:any) => {
  const response = await axios.post(`${API_URL}/, predict`);
  return response.data;
};