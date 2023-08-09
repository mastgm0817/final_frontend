import axios from "axios";
// const URLS = process.env.NEXT_PUBLIC_URL;
const API_URL = "http://localhost:8082/calendar";
// const API_URL = "http://luvoost.co.kr/calendar";
export const createSchedule = async (nickName: string, requestDTO: any) => {
  const response = await axios.post(`${API_URL}/${nickName}`, requestDTO);
  return response.data;
};

export const getAllScheduleByName = async (nickName: string) => {
  const response = await axios.get(`${API_URL}/${nickName}`);
  return response.data;
};

export const updateSchedule = async (
  nickName: string,
  scheduleId: number,
  requestDTO: any
) => {
  const response = await axios.put(
    `${API_URL}/${nickName}/${scheduleId}`,
    requestDTO
  );
  return response.data;
};

export const deleteSchedule = async (
  nickName: string,
  scheduleId: number,
  shared: boolean
) => {
  const response = await axios.delete(`${API_URL}/${nickName}/${scheduleId}`, {
    params: { shared: shared },
  });
  return response.data;
};
