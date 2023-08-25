// ✍️ 

interface ScheduleAddFormProps {
  inputNickName: string;
  inputDate: string;
  inputSchedule: string;
  inputShare: boolean;
  setInputDate: React.Dispatch<React.SetStateAction<string>>;
  setInputSchedule: React.Dispatch<React.SetStateAction<string>>;
  setInputShare: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (e: React.FormEvent) => void;
}

const ScheduleAddForm: React.FC<ScheduleAddFormProps> = ({
  inputNickName,
  inputDate,
  inputSchedule,
  inputShare,
  setInputDate,
  setInputSchedule,
  setInputShare,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className="schedule-form">
      <div className="flex gap-2">
        <label className="w-16 text-right custom-label">별명:</label>
        <input
          type="text"
          value={inputNickName}
          className="border rounded p-1 flex-grow"
          disabled
        />
      </div>
      <div className="flex gap-2">
        <label className="w-16 text-right custom-label">날짜:</label>
        <input
          type="date"
          value={inputDate}
          onChange={(e) => setInputDate(e.target.value)}
          className="border rounded p-1 flex-grow"
        />
        {inputDate.trim() === "" && <div>* 날짜를 선택해 주세요</div>}
      </div>
      <div className="flex gap-2">
        <label className="w-16 text-right custom-label">일정 내용:</label>
        <input
          type="text"
          value={inputSchedule}
          onChange={(e) => setInputSchedule(e.target.value)}
          className="border rounded p-1 flex-grow"
        />
        {inputSchedule.trim() === "" && <div>* 일정 내용을 입력해 주세요</div>}
      </div>
      <div className="flex gap-2">
        <label className="w-16 text-right custom-label">연인과 공유:</label>
        <input
          type="checkbox"
          checked={inputShare}
          onChange={(e) => setInputShare(e.target.checked)}
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-pink-500 text-white rounded self-end"
      >
        일정 등록
      </button>
    </form>
  );
};

export default ScheduleAddForm;
