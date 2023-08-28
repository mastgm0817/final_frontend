// ✍️ 일정 수정 폼
import "./../../public/css/schedule.css";

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
        <div className="flex gap-2 items-center">
          <label className="w-16 text-right custom-label">날짜:</label>
          <input
            type="date"
            value={updatedDate}
            onChange={(e) => setUpdatedDate(e.target.value)}
            className="border rounded p-1 flex-grow"
          />
        </div>
        <div className="flex gap-2 items-center">
          <label className="w-16 text-right custom-label">일정 내용:</label>
          <input
            type="text"
            value={updatedSchedule}
            onChange={(e) => setUpdatedSchedule(e.target.value)}
            className="border rounded p-1 flex-grow"
          />
        </div>
        <div className="flex gap-2 items-center">
          <label className="w-16 text-right custom-label">연인과 공유:</label>
          <input
            type="checkbox"
            checked={updatedShare}
            onChange={(e) => setUpdatedShare(e.target.checked)}
          />
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-pink-500 text-white rounded"
            style={{ marginRight: "2px" }}
          >
            수정 완료
          </button>
          <button
            onClick={handleCancelUpdate}
            className="px-4 py-2 bg-pink-500 text-white rounded focus:outline-none"
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleUpdateForm;
