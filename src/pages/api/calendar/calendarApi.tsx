import axios from 'axios';

const API_URL = 'http://localhost:8080/calendar'; // Change with your actual server API URL

export const createSchedule = async (nickName: string, requestDTO: any) => {
  const response = await axios.post(`${API_URL}/${nickName}`, requestDTO);
  return response.data;
};

export const getAllScheduleByName = async (nickName: string) => {
  const response = await axios.get(`${API_URL}/${nickName}`);
  return response.data;
};

export const updateSchedule = async (nickName: string, scheduleId: number, requestDTO: any) => {
  const response = await axios.put(`${API_URL}/${nickName}/${scheduleId}`, requestDTO);
  return response.data;
};