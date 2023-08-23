import React, { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import CalendarApi from "../app/api/calendar/calendarApi";
import "./../public/css/schedule.css";
import DateProps from "../types/calendar";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";

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
  const session = useSession();
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

  const sessionToken = session.data?.user.id;
  // console.log(sessionToken); * 토큰 확인 코드

  useEffect(() => {
    // Automatically set the nickname input to the user's ID when logged in
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

    // // 입력값이 유효한지 확인
    // if (inputNickName.trim() === "") {
    //   console.error("Nickname cannot be empty!");
    //   return;
    // }

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

  // const filteredSchedules = schedules.filter(
  //   (schedule) => schedule.scheduleDate === formattedSelectedDate
  // );

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
    <div className="p-4 m-4 border rounded bg-white shadow-md">
      <div>
        {showAddForm ? (
          <Button
            onClick={toggleAddForm}
            className="px-4 py-2 bg-red-500 text-white rounded"
            variant="contained"
          >
            취소
          </Button>
        ) : (
          <Button
            onClick={toggleAddForm}
            className="px-4 py-2 bg-blue-500 text-white rounded"
            variant="contained"
          >
            일정 추가
          </Button>
        )}
      </div>
      {showAddForm && (
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mr-2">별명: </label>
            <TextField
              type="text"
              value={inputNickName}
              variant="outlined"
              className="p-2"
              disabled
            />
          </div>
          <div>
            <label className="mr-2">날짜: </label>
            <TextField
              type="date"
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
              variant="outlined"
              className="p-2"
            />
            {inputDate.trim() === "" && <div>* 날짜를 선택해 주세요</div>}
          </div>
          <div>
            <label className="mr-2">일정 내용: </label>
            <TextField
              type="text"
              value={inputSchedule}
              onChange={(e) => setInputSchedule(e.target.value)}
              variant="outlined"
              className="p-2"
            />
            {inputSchedule.trim() === "" && (
              <div>* 일정 내용을 입력해 주세요</div>
            )}
          </div>
          <div>
            <label className="mr-2">연인과 공유: </label>
            <Checkbox
              checked={inputShare}
              onChange={(e) => setInputShare(e.target.checked)}
            />
          </div>
          <Button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
            variant="contained"
          >
            일정 등록
          </Button>
        </form>
      )}

      <h3 className="text-lg font-semibold mt-4">일정 목록</h3>

      {filteredSchedules.length === 0 ? (
        <div className="mt-2">일정이 없습니다.</div>
      ) : (
        <ul className="mt-2 space-y-2">
          {filteredSchedules.map((schedule) => (
            <li
              key={schedule.scheduleId}
              className="flex items-center justify-between px-2 py-1 bg-gray-100 rounded"
            >
              <div className="flex gap-x-4">
                {schedule.writerId} (공유: {schedule.shared ? "⭕" : "❌"})
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {schedule.scheduleContent}
                  </p>
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
        <div className="mt-4">
          <h5 className="text-lg font-semibold mb-2">일정 수정</h5>
          <form onSubmit={handleUpdateSubmit} className="space-y-2">
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
            <Button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded"
              variant="contained"
            >
              수정 완료
            </Button>
            <Button
              onClick={handleCancelUpdate}
              className="px-4 py-2 bg-red-500 text-white rounded"
              variant="contained"
            >
              취소
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Schedule;
