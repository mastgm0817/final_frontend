import React, { useState } from "react";
import { createSchedule } from "../app/api/calendar/calendarApi";
import "/public/css/schedule.css";
interface ScheduleProps {
  nickName: string;
  date: string;
  schedule: string;
  share: boolean;
}

const Schedule: React.FC<ScheduleProps> = ({
  nickName,
  date,
  schedule,
  share,
}) => {
  const [inputNickName, setInputNickName] = useState("");
  const [inputDate, setInputDate] = useState("");
  const [inputSchedule, setInputSchedule] = useState("");
  const [inputShare, setInputShare] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 입력값이 유효한지 확인
    if (inputNickName.trim() === "") {
      console.error("Nickname cannot be empty!");
      return;
    }

    const requestDTO = {
      date: inputDate,
      schedule: inputSchedule,
      share: inputShare,
    };

    try {
      const response = await createSchedule(inputNickName, requestDTO);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label>
        <p>
          Nickname:
          <input
            type="text"
            value={inputNickName}
            onChange={(e) => setInputNickName(e.target.value)}
          />
        </p>
      </label>
      <label>
        <p>
          Date:
          <input
            type="date"
            value={inputDate}
            onChange={(e) => setInputDate(e.target.value)}
          />
        </p>
      </label>
      <label>
        <p>
          Schedule:
          <input
            type="text"
            value={inputSchedule}
            onChange={(e) => setInputSchedule(e.target.value)}
          />
        </p>
      </label>
      <label>
        <p>
          Share:
          <input
            type="checkbox"
            checked={inputShare}
            onChange={(e) => setInputShare(e.target.checked)}
          />
        </p>
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default Schedule;
