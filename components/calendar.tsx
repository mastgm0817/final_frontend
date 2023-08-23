"use client";
import { useState } from "react";
import "/public/css/calendar.css";
import Schedule from "./schedule";

interface ScheduleProps {
  nickName: string;
  selectedDate: DateProps;
}

interface DateProps {
  month: number;
  day: number;
  year: number;
}

const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

export default function Calendar() {
  const date = new Date();
  const [scheduleData, setScheduleData] = useState<any[]>([]);
  const [shareData, setShareData] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<DateProps>({
    month: date.getMonth() + 1,
    day: date.getDate(),
    year: date.getFullYear(),
  });
  const [nickName, setNickName] = useState("");

  const renderCalendar = () => {
    const daysInMonth = new Date(
      selectedDate.year,
      selectedDate.month,
      0
    ).getDate();
    const firstDayOfMonth = new Date(
      selectedDate.year,
      selectedDate.month - 1,
      1
    ).getDay();
    const lastDayOfMonth = new Date(
      selectedDate.year,
      selectedDate.month,
      0
    ).getDay();
    const calendarDays = [];

    for (let i = firstDayOfMonth; i > 0; i--) {
      const day = new Date(
        selectedDate.year,
        selectedDate.month - 1,
        -i + 1
      ).getDate();
      calendarDays.push(
        <div key={`prev-month-${i}`} className="day empty prev-month-day">
          {day}
        </div>
      );
    }

    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push(
        <div
          key={i}
          onClick={() => setSelectedDate({ ...selectedDate, day: i })}
          className={`day ${selectedDate.day === i ? "selected" : ""}`}
        >
          {i}
        </div>
      );
    }

    for (let i = 1; i < 7 - lastDayOfMonth; i++) {
      calendarDays.push(
        <div key={`next-month-${i}`} className="day empty next-month-day">
          {i}
        </div>
      );
    }

    return calendarDays;
  };

  const goToNextMonth = () => {
    if (selectedDate.month === 12) {
      setSelectedDate({ month: 1, day: 1, year: selectedDate.year + 1 });
    } else {
      setSelectedDate({
        ...selectedDate,
        month: selectedDate.month + 1,
        day: 1,
      });
    }
  };

  const goToPrevMonth = () => {
    if (selectedDate.month === 1) {
      setSelectedDate({ month: 12, day: 1, year: selectedDate.year - 1 });
    } else {
      setSelectedDate({
        ...selectedDate,
        month: selectedDate.month - 1,
        day: 1,
      });
    }
  };

  const selectedDayOfWeek =
    daysOfWeek[
      new Date(
        selectedDate.year,
        selectedDate.month - 1,
        selectedDate.day
      ).getDay()
    ];

  return (
    <div className="container">
    <div className="calendar">
      <div className="month-selector flex justify-between items-center mb-4">
        <button onClick={goToPrevMonth}>&lt;</button>
        {selectedDate.year}년 {selectedDate.month}월
        <button onClick={goToNextMonth}>&gt;</button>
      </div>
      <div className="days-of-week grid grid-cols-7 gap-4 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="day-of-week text-center">
            {day}
          </div>
        ))}
      </div>
      <div className="day-list grid grid-cols-7 gap-4">
        {renderCalendar()}
      </div>
    </div>
    <div className="schedule bg-gray-100 rounded-lg shadow-md p-4 mt-4">
      <h2 className="text-xl font-semibold">
        {selectedDate.year}년 {selectedDate.month}월 {selectedDate.day}일 ({selectedDayOfWeek})
      </h2>
      <Schedule
        nickName={nickName}
        date={scheduleData.length > 0 ? scheduleData[0].date : ""}
        schedule={scheduleData.length > 0 ? scheduleData[0].schedule : ""}
        share={shareData}
        selectedDate={selectedDate}
      />
    </div>
  </div>
);
}