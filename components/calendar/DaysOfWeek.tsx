// 📆 캘린더 주간 요일

export default function DaysOfWeek() {
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="days-of-week">
      {daysOfWeek.map((day) => (
        <div key={day} className="day-of-week">
          {day}
        </div>
      ))}
    </div>
  );
}
