// ✍️ 일정 수정 폼

interface ScheduleUpdateFormProps {
  updatedDate: string;
  updatedSchedule: string;
  updatedShare: boolean;
  handleUpdateSubmit: (e: React.FormEvent) => void;
  handleCancelUpdate: () => void;
  setUpdatedDate: (value: string) => void;
  setUpdatedSchedule: (value: string) => void;
  setUpdatedShare: (value: boolean) => void;
}

const ScheduleUpdateForm: React.FC<ScheduleUpdateFormProps> = ({
  updatedDate,
  updatedSchedule,
  updatedShare,
  handleUpdateSubmit,
  handleCancelUpdate,
  setUpdatedDate,
  setUpdatedSchedule,
  setUpdatedShare,
}) => {
  return (
    <div className="schedule-container p-4 m-4 border rounded bg-white shadow-md flex-grow">
      <h5 className="text-lg font-semibold mb-2">일정 수정</h5>
      <form onSubmit={handleUpdateSubmit} className="space-y-2">
        <label className="flex gap-2 items-center">
          날짜:
          <input
            type="date"
            value={updatedDate}
            onChange={(e) => setUpdatedDate(e.target.value)}
            className="border rounded p-1"
          />
        </label>
        <label className="flex gap-2 items-center">
          일정 내용:
          <input
            type="text"
            value={updatedSchedule}
            onChange={(e) => setUpdatedSchedule(e.target.value)}
            className="border rounded p-1"
          />
        </label>
        <label className="flex gap-2 items-center">
          연인과 공유:
          <input
            type="checkbox"
            checked={updatedShare}
            onChange={(e) => setUpdatedShare(e.target.checked)}
          />
        </label>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          수정 완료
        </button>
        <button
          onClick={handleCancelUpdate}
          className="px-4 py-2 bg-pink-500 text-white rounded focus:outline-none"
        >
          취소
        </button>
      </form>
    </div>
  );
};

export default ScheduleUpdateForm;
