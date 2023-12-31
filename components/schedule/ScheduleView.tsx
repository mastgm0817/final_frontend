// ✍️ 일정 관리 부분

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import CalendarApi from "./../../app/api/calendar/calendarApi";
import "./../../public/css/schedule.css";
import DateProps from "./../../types/calendar";
import ScheduleList from "./ScheduleList";
import ScheduleUpdateForm from "./ScheduleUpdateForm";
import ScheduleAddForm from "./ScheduleAddForm";

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
  const [showSharedSchedules, setShowSharedSchedules] = useState(true);
  const [showPersonalSchedules, setShowPersonalSchedules] = useState(true);

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

  useEffect(() => {
    const formattedSelectedDate = `${selectedDate.year}-${selectedDate.month
      .toString()
      .padStart(2, "0")}-${selectedDate.day.toString().padStart(2, "0")}`;

    const filteredSchedules = schedules.filter((schedule) => {
      if (showSharedSchedules && showPersonalSchedules) {
        return schedule.scheduleDate === formattedSelectedDate;
      }

      const isPersonalSchedule = !schedule.shared && showPersonalSchedules;
      const isSharedSchedule = schedule.shared && showSharedSchedules;
      return (
        schedule.scheduleDate === formattedSelectedDate &&
        (isPersonalSchedule || isSharedSchedule)
      );
    });

    setFilteredSchedules(filteredSchedules);
  }, [selectedDate, schedules, showPersonalSchedules, showSharedSchedules]);

  return (
    <div className="flex flex-col h-full">
      <div className="schedule-container p-4 m-4 border rounded bg-white shadow-md flex-grow">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold mb-2">일정 관리</h2>
          <div className="flex gap-4 items-center">
            <button
              onClick={toggleAddForm}
              className="px-4 py-2 bg-pink-500 text-white rounded focus:outline-none"
            >
              {showAddForm ? "취소" : "일정 추가"}
            </button>
            <select
              onChange={(e) => {
                if (e.target.value === "all") {
                  setShowSharedSchedules(true);
                  setShowPersonalSchedules(true);
                } else if (e.target.value === "shared") {
                  setShowSharedSchedules(true);
                  setShowPersonalSchedules(false);
                } else if (e.target.value === "personal") {
                  setShowSharedSchedules(false);
                  setShowPersonalSchedules(true);
                }
              }}
              className="px-4 py-2 rounded focus:outline-none bg-gray-100"
            >
              <option value="all">모든 일정</option>
              <option value="personal">개인 일정</option>
              <option value="shared">공유된 일정</option>
            </select>
          </div>
        </div>

        {showAddForm && (
          <ScheduleAddForm
            inputNickName={inputNickName}
            inputDate={inputDate}
            inputSchedule={inputSchedule}
            inputShare={inputShare}
            setInputDate={setInputDate}
            setInputSchedule={setInputSchedule}
            setInputShare={setInputShare}
            onSubmit={onSubmit}
          />
        )}
      </div>

      {showSharedSchedules || showPersonalSchedules ? (
        <ScheduleList
          filteredSchedules={filteredSchedules}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      ) : (
        <div className="schedule-container p-4 m-4 border rounded bg-white shadow-md mt-4">
          <div className="mt-2">일정을 선택하세요.</div>
        </div>
      )}

      {updateScheduleId && (
        <ScheduleUpdateForm
          updatedDate={updatedDate}
          updatedSchedule={updatedSchedule}
          updatedShare={updatedShare}
          handleUpdateSubmit={handleUpdateSubmit}
          handleCancelUpdate={handleCancelUpdate}
          setUpdatedDate={setUpdatedDate}
          setUpdatedSchedule={setUpdatedSchedule}
          setUpdatedShare={setUpdatedShare}
        />
      )}
    </div>
  );
};

export default ScheduleView;
