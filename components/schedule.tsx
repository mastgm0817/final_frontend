
import React, { useEffect, useState, useCallback } from "react";
import { createSchedule, getAllScheduleByName,
  updateSchedule,
  deleteSchedule, } from "../app/api/calendar/calendarApi";
import "/public/css/schedule.css";
import DateProps from "../types/calendar";

interface ScheduleProps {
  nickName: string;
  date: string;
  schedule: string;
  share: boolean;
  selectedDate: DateProps;
}

const Schedule: React.FC<ScheduleProps> = ({
  nickName,
  date,
  schedule,
  share,
  selectedDate,
}) => {
  const [inputNickName, setInputNickName] = useState("");
  const [inputDate, setInputDate] = useState("");
  const [inputSchedule, setInputSchedule] = useState("");
  const [inputShare, setInputShare] = useState(false);
  const [updateScheduleId, setUpdateScheduleId] = useState<number | null>(null);
  const [updatedDate, setUpdatedDate] = useState("");
  const [updatedSchedule, setUpdatedSchedule] = useState("");
  const [updatedShare, setUpdatedShare] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  // 일정 수정
  const handleUpdate = (
    scheduleId: number,
    scheduleContent: string,
    scheduleDate: string,
    scheduleShare: boolean
  ) => {
    setUpdateScheduleId(scheduleId);
    setUpdatedDate(scheduleDate);
    setUpdatedSchedule(scheduleContent);
    setUpdatedShare(scheduleShare);
  };

  const handleCancelUpdate = () => {
    setUpdateScheduleId(null);
    setUpdatedDate("");
    setUpdatedSchedule("");
    setUpdatedShare(false);
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !updateScheduleId ||
      updatedSchedule.trim() === "" ||
      updatedDate.trim() === ""
    ) {
      console.error("Schedule ID, content, or date cannot be empty!");
      return;
    }

    const requestDTO = {
      date: updatedDate,
      schedule: updatedSchedule,
      share: updatedShare,
    };

    try {
      const response = await updateSchedule(
        nickName,
        updateScheduleId,
        requestDTO
      );
      console.log(response);
      // Reload schedules after successful update
      loadSchedules();
      // Clear update state
      setUpdateScheduleId(null);
      setUpdatedDate("");
      setUpdatedSchedule("");
      setUpdatedShare(false);
    } catch (error) {
      console.error(error);
    }
  };

  // 일정 삭제
  const handleDelete = async (scheduleId: number, shared: boolean) => {
    try {
      const response = await deleteSchedule(nickName, scheduleId, shared);
      console.log(response);
      // Reload schedules after successful deletion
      loadSchedules();
    } catch (error) {
      console.error(error);
    }
  };

  // 생성된 일정 조회
  const [schedules, setSchedules] = useState<any[]>([]);

  const loadSchedules = useCallback(async () => {
    try {
      const response = await getAllScheduleByName(nickName);
      setSchedules(response);
    } catch (error) {
      console.error(error);
    }
  }, [nickName]);

  useEffect(() => {
    loadSchedules();
  }, [nickName, loadSchedules]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 입력값이 유효한지 확인
    if (inputNickName.trim() === "") {
      console.error("Nickname cannot be empty!");
      return;
    }

    const requestDTO = {
      date: inputDate,
      schedule: inputSchedule,
      share: inputShare,
    };

    try {
      const response = await createSchedule(inputNickName, requestDTO);
      console.log(response);
      // 등록 후, 새로운 일정 목록을 불러옴
      loadSchedules();
      // 입력 필드 초기화
      setInputDate("");
      setInputSchedule("");
      setInputShare(false);
    } catch (error) {
      console.error(error);
    }
  };

  // 일정 추가 폼 on/off
  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const formattedSelectedDate = `${selectedDate.year}-${selectedDate.month
    .toString()
    .padStart(2, "0")}-${selectedDate.day.toString().padStart(2, "0")}`;

  const filteredSchedules = schedules.filter(
    (schedule) => schedule.scheduleDate === formattedSelectedDate
  );

  return (
    <div className="p-4 m-4 border rounded">
      <div>
        {showAddForm ? (
          <button
            onClick={toggleAddForm}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            취소
          </button>
        ) : (
          <button
            onClick={toggleAddForm}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            일정 추가
          </button>
        )}
      </div>
      {showAddForm && (
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mr-2">별명: </label>
            <input
              type="text"
              value={inputNickName}
              onChange={(e) => setInputNickName(e.target.value)}
              className="p-2 border rounded"
            />
          </div>
          <div>
            <label className="mr-2">날짜: </label>
            <input
              type="date"
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
              className="p-2 border rounded"
            />
          </div>
          <div>
            <label className="mr-2">일정 내용: </label>
            <input
              type="text"
              value={inputSchedule}
              onChange={(e) => setInputSchedule(e.target.value)}
              className="p-2 border rounded"
            />
          </div>
          <div>
            <label className="mr-2">연인과 공유: </label>
            <input
              type="checkbox"
              checked={inputShare}
              onChange={(e) => setInputShare(e.target.checked)}
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            일정 등록
          </button>
        </form>
      )}

      <h3 className="schedule-list">일정 목록</h3>

      {filteredSchedules.length === 0 ? (
        <div>일정이 없습니다.</div>
      ) : (
        <ul role="list" className="divide-y divide-gray-100">
          {filteredSchedules.map((schedule) => (
            <li key={schedule.scheduleId} className="flex justify-between gap-x-6 py-5">
              <div className="flex gap-x-4">
              {schedule.writerId} (공유: {schedule.shared ? "⭕" : "❌"})
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{schedule.scheduleContent}</p>
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

      {updateScheduleId && (
        <>
          <h5 className="mt-4">일정 수정</h5>
          <form onSubmit={handleUpdateSubmit} className="space-y-4">
            <label>
              날짜:
              <input
                type="date"
                value={updatedDate}
                onChange={(e) => setUpdatedDate(e.target.value)}
              />
            </label>
            <label>
              일정 내용:
              <input
                type="text"
                value={updatedSchedule}
                onChange={(e) => setUpdatedSchedule(e.target.value)}
              />
            </label>
            <label>
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
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              취소
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Schedule;
