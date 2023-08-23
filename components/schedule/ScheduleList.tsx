import React from "react";
import "./../../public/css/schedule.css";

interface ScheduleListProps {
  filteredSchedules: any[];
  handleUpdate: Function;
  handleDelete: Function;
}

const ScheduleList: React.FC<ScheduleListProps> = ({
  filteredSchedules,
  handleUpdate,
  handleDelete,
}) => {
  return (
    <div className="schedule-container p-4 m-4 border rounded bg-white shadow-md mt-4">
      <h3 className="text-lg font-semibold mt-4">일정 목록</h3>

      {filteredSchedules.length === 0 ? (
        <div className="mt-2">일정이 없습니다.</div>
      ) : (
        <ul className="mt-2 space-y-2">
          {filteredSchedules.map((schedule) => (
            <li
              key={schedule.scheduleId}
              className="flex items-center justify-between px-2 py-1 bg-gray-100 rounded"
            >
              <div className="flex gap-x-4">
                {schedule.writerId}님 (공유: {schedule.shared ? "⭕" : "❌"})
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {schedule.scheduleContent}
                  </p>
                  <button
                    onClick={() =>
                      handleUpdate(
                        schedule.scheduleId,
                        schedule.scheduleContent,
                        schedule.scheduleDate,
                        schedule.shared
                      )
                    }
                    className="hover:underline focus:outline-none"
                  >
                    수정
                  </button>
                  <button
                    onClick={() =>
                      handleDelete(schedule.scheduleId, schedule.shared)
                    }
                    className="hover:underline focus:outline-none"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ScheduleList;
