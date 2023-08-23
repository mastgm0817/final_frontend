import React from "react";

interface DDayProps {
  selectedDate: DateProps;
}

interface DateProps {
  month: number;
  day: number;
  year: number;
}

const DDay: React.FC<DDayProps> = ({ selectedDate }) => {
  const calculateDDay = () => {
    const today = new Date();
    const selected = new Date(
      selectedDate.year,
      selectedDate.month - 1,
      selectedDate.day
    );
    const timeDiff = selected.getTime() - today.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (dayDiff === 0) {
      return "D-Day!";
    } else if (dayDiff > 0) {
      return `D-${dayDiff}`;
    } else {
      return `D+${Math.abs(dayDiff)}`;
    }
  };

  return (
    <div className="d-day-container bg-gray-100 p-4 mt-4 border rounded shadow-md">
      <h3 className="text-lg font-semibold mb-2">D-Day</h3>
      <p className="text-2xl">{calculateDDay()}</p>
    </div>
  );
};

export default DDay;
