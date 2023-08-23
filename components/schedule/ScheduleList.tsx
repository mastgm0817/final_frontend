import React from 'react';

interface ScheduleItem {
  scheduleId: number;
  writerId: string;
  shared: boolean;
  scheduleContent: string;
  scheduleDate: string;
}

interface ScheduleListProps {
  schedules: ScheduleItem[];
  handleUpdate: (
    scheduleId: number,
    scheduleContent: string,
    scheduleDate: string,
    scheduleShare: boolean
  ) => void;
  handleDelete: (scheduleId: number, shared: boolean) => void;
}

const ScheduleList: React.FC<ScheduleListProps> = ({
  schedules,
  handleUpdate,
  handleDelete
}) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mt-4">일정 목록</h3>
      {schedules.length === 0 ? (
        <div className="mt-2">일정이 없습니다.</div>
      ) : (
        <ul className="mt-2 space-y-2">
          {schedules.map((schedule) => (
            <li
              key={schedule.scheduleId}
              className="flex items-center justify-between px-2 py-1 bg-gray-100 rounded"
            >
              <div className="flex gap-x-4">
                {schedule.writerId} (공유: {schedule.shared ? "⭕" : "❌"})
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
                  >
                    수정
                  </button>
                  <button
                    onClick={() =>
                      handleDelete(schedule.scheduleId, schedule.shared)
                    }
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
