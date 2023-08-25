// ✍️ 일정 목록 조회

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
      <h2 className="text-lg font-semibold mb-2">일정 목록</h2>

      {filteredSchedules.length === 0 ? (
        <div className="mt-2">일정이 없습니다.</div>
      ) : (
        <ul className="mt-2 space-y-2">
          {filteredSchedules.map((schedule) => (
            <li
              key={schedule.scheduleId}
              className="flex items-center justify-between px-2 py-1 bg-gray-100 rounded"
            >
              <div className="flex items-center gap-x-4 w-full">
                <div className="flex-auto">
                  {schedule.writerId}님
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {schedule.scheduleContent}
                  </p>
                </div>
                <div className="flex items-center gap-x-2">
                  <span className="text-gray-500">
                    공유: {schedule.shared ? "⭕" : "❌"}
                  </span>
                  <button
                    onClick={() =>
                      handleUpdate(
                        schedule.scheduleId,
                        schedule.scheduleContent,
                        schedule.scheduleDate,
                        schedule.shared
                      )
                    }
                    className="hover:underline focus:outline-none text-sm text-blue-500"
                  >
                    수정
                  </button>
                  <button
                    onClick={() =>
                      handleDelete(schedule.scheduleId, schedule.shared)
                    }
                    className="hover:underline focus:outline-none text-sm text-red-500"
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
