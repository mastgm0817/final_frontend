// ✍️ 일정 목록 조회 
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";

interface AddScheduleProps {
  onSubmit: (data: {
    inputNickName: string;
    inputDate: string;
    inputSchedule: string;
    inputShare: boolean;
  }) => void;
  inputNickName: string;
  showAddForm: boolean;
  toggleAddForm: () => void;
}

const AddSchedule: React.FC<AddScheduleProps> = ({
  onSubmit,
  inputNickName,
  showAddForm,
  toggleAddForm,
}) => {
  const [inputDate, setInputDate] = useState("");
  const [inputSchedule, setInputSchedule] = useState("");
  const [inputShare, setInputShare] = useState(false);

  const handleSubmit = () => {
    onSubmit({
      inputNickName,
      inputDate,
      inputSchedule,
      inputShare,
    });

    setInputDate("");
    setInputSchedule("");
    setInputShare(false);
  };

  return (
    <>
      <div>
        {showAddForm ? (
          <Button
            onClick={toggleAddForm}
            className="px-4 py-2 bg-red-500 text-white rounded"
            variant="contained"
          >
            취소
          </Button>
        ) : (
          <Button
            onClick={toggleAddForm}
            className="px-4 py-2 bg-blue-500 text-white rounded"
            variant="contained"
          >
            일정 추가
          </Button>
        )}
      </div>
      {showAddForm && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mr-2">별명: </label>
            <TextField
              type="text"
              value={inputNickName}
              variant="outlined"
              className="p-2"
              disabled
            />
          </div>
          <div>
            <label className="mr-2">날짜: </label>
            <TextField
              type="date"
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
              variant="outlined"
              className="p-2"
            />
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
      )}
    </>
  );
};

export default AddSchedule;
