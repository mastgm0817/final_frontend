import React, { useState } from "react";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";

interface ScheduleUpdateProps {
  updateScheduleId: number | null;
  handleUpdateSubmit: (e: React.FormEvent) => void;
  handleCancelUpdate: () => void;
  // Include other necessary props
}

const ScheduleUpdate: React.FC<ScheduleUpdateProps> = ({
  updateScheduleId,
  handleUpdateSubmit,
  handleCancelUpdate,
  // Include other necessary props
}) => {
  const [updatedDate, setUpdatedDate] = useState("");
  const [updatedSchedule, setUpdatedSchedule] = useState("");
  const [updatedShare, setUpdatedShare] = useState(false);

  return (
    <div className="mt-4">
      <h5 className="text-lg font-semibold mb-2">일정 수정</h5>
      <form onSubmit={handleUpdateSubmit} className="space-y-2">
        <label>
          날짜:
          <input
            type="date"
            value={updatedDate}
            onChange={(e) => setUpdatedDate(e.target.value)}
          />
        </label>
        <label>
          일정 내용:
          <input
            type="text"
            value={updatedSchedule}
            onChange={(e) => setUpdatedSchedule(e.target.value)}
          />
        </label>
        <label>
          연인과 공유:
          <Checkbox
            checked={updatedShare}
            onChange={(e) => setUpdatedShare(e.target.checked)}
          />
        </label>
        <Button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded"
          variant="contained"
        >
          수정 완료
        </Button>
        <Button
          onClick={handleCancelUpdate}
          className="px-4 py-2 bg-red-500 text-white rounded"
          variant="contained"
        >
          취소
        </Button>
      </form>
    </div>
  );
};

export default ScheduleUpdate;
