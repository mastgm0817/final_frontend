"use client";
import { useState } from "react";
import "/public/css/calendar.css";
import Schedule from "./schedule";
import { IconButton, Card, CardContent } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Weather from "./weather";

interface DateProps {
  month: number;
  day: number;
  year: number;
}

const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

export default function Calendar() {
  const date = new Date();
  const [selectedDate, setSelectedDate] = useState<DateProps>({
    month: date.getMonth() + 1,
    day: date.getDate(),
    year: date.getFullYear(),
  });

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
        <Card
          key={i}
          onClick={() => setSelectedDate({ ...selectedDate, day: i })}
          className={`day ${selectedDate.day === i ? "selected" : ""}`}
        >
          <CardContent>{i}</CardContent>
        </Card>
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
        <h2>Luvoost</h2>
        <div className="month-selector">
          <IconButton onClick={goToPrevMonth}>
            <ArrowBackIosIcon />
          </IconButton>
          {selectedDate.year}년 {selectedDate.month}월
          <IconButton onClick={goToNextMonth}>
            <ArrowForwardIosIcon />
          </IconButton>
        </div>
        <div className="days-of-week">
          {daysOfWeek.map((day) => (
            <div key={day} className="day-of-week">
              {day}
            </div>
          ))}
        </div>
        <div className="day-list">{renderCalendar()}</div>
      </div>
      <div className="schedule">
        <h2>
          {selectedDate.year}년 {selectedDate.month}월 {selectedDate.day}일
        </h2>
        <p>{selectedDayOfWeek}요일</p>
        <Schedule selectedDate={selectedDate} />
        <Weather />
      </div>
    </div>
  );
}
