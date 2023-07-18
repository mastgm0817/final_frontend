import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CalendarPage = () => {
  const [userId, setUserId] = useState('');
  const [date, setDate] = useState('');
  const [share, setShare] = useState(false);
  const [schedule, setSchedule] = useState('');
  const [schedules, setSchedules] = useState<any[]>([]);

  // 사용자 일정 생성
  const createSchedule = async () => {
    try {
      const response = await axios.post(`/calendar/setSchedule/userId=${userId}`, {
        schedule: schedule,
        date: date,
        share: share,
      });
      console.log(response.data); // Schedule create successfully
      clearForm();
      getAllSchedules(); // 일정 생성 후 일정 목록을 다시 조회합니다.
    } catch (error) {
      console.error(error);
    }
  };
  
  
  const getAllSchedules = async () => {
    try {
      const response = await axios.get(`/calendar/getSchedule/userId=${userId}`);
      const schedules = response.data.map((schedule: any) => {
        if (schedule.hasOwnProperty("myScheduleContent")) {
          return {
            scheduleContent: schedule.myScheduleContent,
            createdDate: schedule.createdDate,
            // 다른 필드들도 필요한 경우 추가
          };
        } else if (schedule.hasOwnProperty("shareScheduleContent")) {
          return {
            scheduleContent: schedule.shareScheduleContent,
            createdDate: schedule.createdDate,
            // 다른 필드들도 필요한 경우 추가
          };
        }
      });
      setSchedules(schedules);
    } catch (error) {
      console.error(error);
    }
  };
  
  

  // 일정 생성 후 폼 초기화
  const clearForm = () => {
    setUserId('');
    setDate('');
    setShare(false);
    setSchedule('');
  };

  // 페이지 로드 시 전체 일정 조회
  useEffect(() => {
    getAllSchedules();
  }, []);

  return (
    <div>
      <h2>Create Schedule</h2>
      <label>
        User ID:
        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
      </label>
      <br />
      <label>
        Date:
        <input type="text" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>
      <br />
      <label>
        Share:
        <input type="checkbox" checked={share} onChange={(e) => setShare(e.target.checked)} />
      </label>
      <br />
      <label>
        Schedule:
        <input type="text" value={schedule} onChange={(e) => setSchedule(e.target.value)} />
      </label>
      <br />
      <button onClick={createSchedule}>Create</button>

      <h2>Get All Schedules</h2>
      <label>
        User ID:
        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
      </label>
      <br />
      <button onClick={getAllSchedules}>Get All</button>

      <h2>Schedules</h2>
      {schedules.length > 0 ? (
        <ul>
          {schedules.map((schedule) => (
            <li key={schedule.createdDate}>
              <div>Content: {schedule.scheduleContent}</div>
              <div>Created Date: {schedule.createdDate}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No schedules found</p>
      )}
    </div>
  );
};

export default CalendarPage;