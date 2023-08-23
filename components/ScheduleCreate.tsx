import React, { useState } from "react";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";

interface ScheduleCreateProps {
  sessionToken: string | null;
  loadSchedules: Function;
}

const ScheduleCreate: React.FC<ScheduleCreateProps> = ({ sessionToken, loadSchedules }) => {
  const [inputDate, setInputDate] = useState("");
  const [inputSchedule, setInputSchedule] = useState("");
  const [inputShare, setInputShare] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (inputDate.trim() === "") {
      console.error("Date cannot be empty!");
      return;
    }

    if (inputSchedule.trim() === "") {
      console.error("Schedule content cannot be empty!");
      return;
    }

    const requestDTO = {
      date: inputDate,
      schedule: inputSchedule,
      share: inputShare,
    };

    if (sessionToken) {
      try {
        // Add logic here to create a new schedule using your API or service
        console.log("Creating schedule...");
        
        // After successful creation, load updated schedules
        loadSchedules();
        
        // Reset form inputs
        setInputDate("");
        setInputSchedule("");
        setInputShare(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="mr-2">날짜: </label>
        <TextField
          type="date"
          value={inputDate}
          onChange={(e) => setInputDate(e.target.value)}
          variant="outlined"
          className="p-2"
        />
        {inputDate.trim() === "" && <div>* 날짜를 선택해 주세요</div>}
      </div>
      <div>
        <label className="mr-2">일정 내용: </label>
        <TextField
          type="text"
          value={inputSchedule}
          onChange={(e) => setInputSchedule(e.target.value)}
          variant="outlined"
          className="p-2"
        />
        {inputSchedule.trim() === "" && <div>* 일정 내용을 입력해 주세요</div>}
      </div>
      <div>
        <label className="mr-2">연인과 공유: </label>
        <Checkbox
          checked={inputShare}
          onChange={(e) => setInputShare(e.target.checked)}
        />
      </div>
      <Button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
        variant="contained"
      >
        일정 등록
      </Button>
    </form>
  );
};

export default ScheduleCreate;
