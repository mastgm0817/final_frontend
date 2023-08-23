import React, { useState } from "react";
import Button from "@mui/material/Button";

interface ScheduleEditProps {
  updateScheduleId: number | null;
  updatedDate: string;
  updatedSchedule: string;
  updatedShare: boolean;
  handleUpdateSubmit: (e: React.FormEvent) => void;
  handleCancelUpdate: () => void;
}

const ScheduleEdit: React.FC<ScheduleEditProps> = ({
  updateScheduleId,
  updatedDate,
  updatedSchedule,
  updatedShare,
  handleUpdateSubmit,
  handleCancelUpdate,
}) => {
  return (
    <div className="mt-4">
      {/* Form for updating schedule */}
      {/* ... */}
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
    </div>
  );
};

export default ScheduleEdit;
