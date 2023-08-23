import React from "react";
import Button from "@mui/material/Button";

interface ScheduleDeleteProps {
  scheduleId: number;
  shared: boolean;
  handleDelete: (scheduleId: number, shared: boolean) => void;
}

const ScheduleDelete: React.FC<ScheduleDeleteProps> = ({ scheduleId, shared, handleDelete }) => {
  const confirmDelete = () => {
    const confirmed = window.confirm("정말로 이 일정을 삭제하시겠습니까?");
    if (confirmed) {
      handleDelete(scheduleId, shared);
    }
  };

  return (
    <Button
      onClick={confirmDelete}
      className="px-2 py-1 bg-red-500 text-white rounded"
      variant="contained"
    >
      삭제
    </Button>
  );
};

export default ScheduleDelete;
