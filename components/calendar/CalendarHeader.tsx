// 📆 캘린더 헤더 (년/월, < > 선택 부분)
import DateProps from "../../types/calendar";

interface CalendarHeaderProps {
  selectedDate: DateProps;
  goToPrevMonth: () => void;
  goToNextMonth: () => void;
}

export default function CalendarHeader({
  selectedDate,
  goToPrevMonth,
  goToNextMonth,
}: CalendarHeaderProps) {
  return (
    <div className="month-selector">
      <button onClick={goToPrevMonth}>&lt;</button>
      {selectedDate.year}년 {selectedDate.month}월
      <button onClick={goToNextMonth}>&gt;</button>
    </div>
  );
}
