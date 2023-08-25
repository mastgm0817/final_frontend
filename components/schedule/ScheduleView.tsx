import React, { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import CalendarApi from "./../../app/api/calendar/calendarApi";
import "./../../public/css/schedule.css";
import DateProps from "./../../types/calendar";
import ScheduleList from "./ScheduleList";

interface ScheduleProps {
  nickName: string;
  date: string;
  schedule: string;
  share: boolean;
  selectedDate: DateProps;
}

const ScheduleView: React.FC<ScheduleProps> = ({
  nickName,
  date,
  schedule,
  share,
  selectedDate,
}) => {
  const session = useSession();
  const sessionToken = session.data?.user.id;
  // console.log(sessionToken); * 토큰 확인 코드
  const [inputNickName, setInputNickName] = useState("");
  const [inputDate, setInputDate] = useState("");
  const [inputSchedule, setInputSchedule] = useState("");
  const [inputShare, setInputShare] = useState(false);
  const [updateScheduleId, setUpdateScheduleId] = useState<number | null>(null);
  const [updatedDate, setUpdatedDate] = useState("");
  const [updatedSchedule, setUpdatedSchedule] = useState("");
  const [updatedShare, setUpdatedShare] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filteredSchedules, setFilteredSchedules] = useState<any[]>([]);

  useEffect(() => {
    if (session.data?.user.name) {
      setInputNickName(session.data.user.name);
    }
  }, [session]);

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

    if (sessionToken) {
      try {
        const response = await CalendarApi.updateSchedule(
          session.data?.user.name,
          updateScheduleId.toString(),
          requestDTO,
          sessionToken
        );
        console.log(response);
        loadSchedules();
        setUpdateScheduleId(null);
        setUpdatedDate("");
        setUpdatedSchedule("");
        setUpdatedShare(false);
      } catch (error) {
        console.error(error);
      }
    }
  };
  // 일정 삭제
  const handleDelete = async (scheduleId: number, shared: boolean) => {
    if (sessionToken) {
      try {
        const response = await CalendarApi.deleteSchedule(
          session.data?.user.name,
          scheduleId.toString(),
          shared,
          sessionToken
        );
        console.log(response);
        // Reload schedules after successful deletion
        loadSchedules();
      } catch (error) {
        console.error(error);
      }
    }
  };

  // 생성된 일정 조회
  const [schedules, setSchedules] = useState<any[]>([]);
  const loadSchedules = useCallback(async () => {
    if (sessionToken) {
      try {
        const response = await CalendarApi.getAllScheduleByName(
          session.data?.user.name,
          sessionToken
        );
        setSchedules(response);
      } catch (error) {
        console.error(error);
      }
    }
  }, [session.data?.user.name, sessionToken]);

  useEffect(() => {
    loadSchedules();
  }, [session.data?.user.name, loadSchedules]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requestDTO = {
      date: inputDate,
      schedule: inputSchedule,
      share: inputShare,
    };

    if (sessionToken) {
      try {
        const response = await CalendarApi.createSchedule(
          inputNickName,
          requestDTO,
          sessionToken
        );
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
    }
  };

  // 일정 추가 폼 on/off
  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const formattedSelectedDate = `${selectedDate.year}-${selectedDate.month
    .toString()
    .padStart(2, "0")}-${selectedDate.day.toString().padStart(2, "0")}`;

  useEffect(() => {
    const formattedSelectedDate = `${selectedDate.year}-${selectedDate.month
      .toString()
      .padStart(2, "0")}-${selectedDate.day.toString().padStart(2, "0")}`;
    const filteredSchedules = schedules.filter(
      (schedule) => schedule.scheduleDate === formattedSelectedDate
    );
    setFilteredSchedules(filteredSchedules);
  }, [selectedDate, schedules]);

  return (
    <div className="flex flex-col h-full">
      <div className="schedule-container p-4 m-4 border rounded bg-white shadow-md flex-grow">
        <h2 className="text-2xl font-semibold">일정 관리</h2>
        {showAddForm ? (
          <button
            onClick={toggleAddForm}
            className="px-4 py-2 bg-pink-500 text-white rounded focus:outline-none"
          >
            취소
          </button>
        ) : (
          <button
            onClick={toggleAddForm}
            className="px-4 py-2 bg-pink-500 text-white rounded focus:outline-none"
          >
            일정 추가
          </button>
        )}

        {showAddForm && (
          <form onSubmit={onSubmit} className="schedule-form">
            <div className="flex gap-2">
              <label className="w-16 text-right">별명:</label>
              <input
                type="text"
                value={inputNickName}
                className="border rounded p-1 flex-grow"
                disabled
              />
            </div>
            <div className="flex gap-2">
              <label className="w-16 text-right">날짜:</label>
              <input
                type="date"
                value={inputDate}
                onChange={(e) => setInputDate(e.target.value)}
                className="border rounded p-1"
              />
              {inputDate.trim() === "" && <div>* 날짜를 선택해 주세요</div>}
            </div>
            <div className="flex gap-2">
              <label className="w-16 text-right">일정 내용:</label>
              <input
                type="text"
                value={inputSchedule}
                onChange={(e) => setInputSchedule(e.target.value)}
                className="border rounded p-1"
              />
              {inputSchedule.trim() === "" && (
                <div>* 일정 내용을 입력해 주세요</div>
              )}
            </div>
            <div className="flex gap-2">
              <label className="w-16 text-right">연인과 공유:</label>
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
        )}
      </div>

      <ScheduleList
        filteredSchedules={filteredSchedules}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />

      {updateScheduleId && (
        <div className="mt-4">
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
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              취소
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ScheduleView;
