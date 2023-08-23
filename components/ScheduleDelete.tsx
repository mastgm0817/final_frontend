import React from "react";
import Button from "@mui/material/Button";

interface ScheduleDeleteProps {
  scheduleId: number;
  shared: boolean;
  sessionToken: string | null;
  loadSchedules: Function;
}

const ScheduleDelete: React.FC<ScheduleDeleteProps> = ({ scheduleId, shared, sessionToken, loadSchedules }) => {
  const handleDelete = async () => {
    if (sessionToken) {
      try {
        // Add logic here to delete the schedule using your API or service
        console.log("Deleting schedule...");
        
        // After successful deletion, load updated schedules
        loadSchedules();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Button
      onClick={handleDelete}
      className="px-4 py-2 bg-red-500 text-white rounded"
      variant="contained"
    >
      삭제
    </Button>
  );
};

export default ScheduleDelete;
