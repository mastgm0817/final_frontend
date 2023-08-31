import axios from "axios";
import { getSession } from "next-auth/react";
import DateProps from "../../../types/calendar";

interface ScheduleProps {
  nickName: string;
  date: string;
  schedule: string;
  share: boolean;
  selectedDate: DateProps;
  // token: string;
}

interface CalendarRequestDTO {
  date: string;
  share: boolean;
  schedule: string;
}

const URL = process.env.NEXT_PUBLIC_URL;
const API_URL = `${URL}/calendar`;

const CalendarApi = {
  getAllScheduleByName: async (nickName: any, token: any) => {
    try {
      // const response = await axios.get(`${API_URL}/${nickName}`, {
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
    nickName: any,
    requestDTO: CalendarRequestDTO,
    token: any
  ) => {
    try {
      const response = await axios.post(`${API_URL}/${nickName}`, requestDTO, {
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

  updateSchedule: async (
    nickName: any,
    scheduleId: string,
    requestDTO: CalendarRequestDTO,
    token: any
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
    nickName: any,
    scheduleId: string,
    shared: boolean,
    token: any
  ) => {
    try {
      const response = await axios.delete(
        `${API_URL}/${nickName}/${scheduleId}`,
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
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
