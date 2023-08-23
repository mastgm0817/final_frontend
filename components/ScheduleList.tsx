import React from "react";

interface ScheduleListProps {
  schedules: any[]; // Update this type according to your schedule data structure
  handleUpdate: Function;
  handleDelete: Function;
}

const ScheduleList: React.FC<ScheduleListProps> = ({
  schedules,
  handleUpdate,
  handleDelete,
}) => {
  return (
    <ul className="mt-2 space-y-2">
      {schedules.map((schedule) => (
        <li key={schedule.scheduleId} className="flex items-center justify-between px-2 py-1 bg-gray-100 rounded">
          {/* Display schedule details and buttons for update and delete */}
        </li>
      ))}
    </ul>
  );
};

export default ScheduleList;
