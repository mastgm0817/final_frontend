// 📆 캘린더 뷰, 조회

"use client";
import React, { useState } from "react";
import "/public/css/calendar.css";
import ScheduleView from "../schedule/ScheduleView";
import CalendarHeader from "./CalendarHeader";
import DaysOfWeek from "./DaysOfWeek";
import DDay from "./DDay";

interface ScheduleProps {
  nickName: string;
  selectedDate: DateProps;
}
interface DateProps {
  month: number;
  day: number;
  year: number;
}

export default function CalendarView() {
  const date = new Date();
  const [scheduleData, setScheduleData] = useState<any[]>([]);
  const [shareData, setShareData] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<DateProps>({
    month: date.getMonth() + 1,
    day: date.getDate(),
    year: date.getFullYear(),
  });
  const [nickName, setNickName] = useState("");
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<number>(selectedDate.year);
  const [selectedMonth, setSelectedMonth] = useState<number>(
    selectedDate.month
  );

  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

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
      const currentDate = new Date(
        selectedDate.year,
        selectedDate.month - 1,
        i
      );
      const isSunday = currentDate.getDay() === 0; // 0 corresponds to Sunday
      const dayClass = `day ${selectedDate.day === i ? "selected" : ""} ${
        isSunday ? "sunday" : ""
      }`;

      calendarDays.push(
        <div
          key={i}
          onClick={() => setSelectedDate({ ...selectedDate, day: i })}
          className={dayClass}
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

  // 오늘로 이동
  const goToToday = () => {
    const today = new Date();
    setSelectedDate({
      month: today.getMonth() + 1,
      day: today.getDate(),
      year: today.getFullYear(),
    });
  };

  // 날짜 년도/월/일 별로 가져오기
  const handleDateChange = () => {
    setSelectedDate({
      year: selectedYear,
      month: selectedMonth,
      day: selectedDate.day,
    });
    setShowDatePicker(false);
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
      <div className="calendar-container">
        <div className="calendar">
          <CalendarHeader
            selectedDate={selectedDate}
            goToPrevMonth={goToPrevMonth}
            goToNextMonth={goToNextMonth}
            onYearChange={setSelectedYear}
            onMonthChange={setSelectedMonth}
          />
          <DaysOfWeek />
          <div className="day-list">{renderCalendar()}</div>
        </div>
      </div>
      <div className="schedule-container">
        <div className="schedule">
          <DDay selectedDate={selectedDate} />
          <h2 className="text-lg font-semibold mb-2">
            {selectedDate.year}년 {selectedDate.month}월 {selectedDate.day}일
          </h2>
          <ScheduleView
            nickName={nickName}
            date={scheduleData.length > 0 ? scheduleData[0].date : ""}
            schedule={scheduleData.length > 0 ? scheduleData[0].schedule : ""}
            share={shareData}
            selectedDate={selectedDate}
          />
        </div>
      </div>
    </div>
  );
}
