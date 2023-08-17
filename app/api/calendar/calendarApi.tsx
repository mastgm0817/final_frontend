// import axios from "axios";
// // const URLS = process.env.NEXT_PUBLIC_URL;
// // const API_URL = "http://localhost:8082/calendar";
// // const API_URL = "http://luvoost.co.kr/calendar";


import axios from "axios";
import { useSession } from "next-auth/react";



interface CalendarRequestDTO {
  date: string;
  share: boolean;
  schedule: string;
}

const URL = process.env.NEXT_PUBLIC_URL;
const API_URL = `${URL}/calendar`;

const CalendarApi = {
  
  getAllScheduleByName: async (nickName: string, token: string) => {
    try {
      const response = await axios.get(`${API_URL}/${nickName}`, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  createSchedule: async (
    nickName: string,
    requestDTO: CalendarRequestDTO,
    token: string
  ) => {
    try {
      // console.log("API 호출 URL:", `${API_URL}/${nickName}`);
      // console.log("요청 데이터:", requestDTO);

      const response = await axios.post(`${API_URL}/${nickName}`, requestDTO, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("응답 데이터:", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateSchedule: async (
    nickName: string,
    scheduleId: string,
    requestDTO: CalendarRequestDTO,
    token: string
  ) => {
    try {
      const response = await axios.put(
        `${API_URL}/${nickName}/${scheduleId}`,
        requestDTO,
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteSchedule: async (
    nickName: string,
    scheduleId: string,
    shared: boolean,
    token: string
  ) => {
    try {
      const response = await axios.delete(
        `${API_URL}/${nickName}/${scheduleId}`,
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${token}`,
          },
          params: { shared: shared },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
export default CalendarApi;