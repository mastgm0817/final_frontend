import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import TodoHead from "./viewcomponent/todohead/TodoHead";
import TodoCreate from "./viewcomponent/todocreate/TodoCreate";
import TodoItemList from "./viewcomponent/todoitemlist/TodoItemList";
import {
  todos as actionTodos,
  createTodo,
  dayTodolist,
  toggleTodo,
  removeTodo,
  todos,
  clearTodos
} from "../../store/modules/todolist";

// TodoList 영역
import axios from 'axios';
const TodoTemplateBlock = styled.div`
  display: flex;
  position: relative;
  width: 90%;
  height: 350px;
  margin: 20px;
  padding: 20px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
  flex-direction: column;
`;



const TodoList = () => {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [shared, setShared] = useState(false);
  const dispatch = useDispatch();
  const {
    id,
    filteredTodos,
    currentDay,
    currentMonth,
    currentYear,
  } = useSelector((state) => ({
    id: state.todolist.id,
    filteredTodos: state.todolist.filteredTodos,
    currentDay: state.date.currentDay,
    currentMonth: state.date.currentMonth,
    currentYear: state.date.currentYear,
  }));

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/calendar/getSchedule/userName=SW");
        const data = response.data;

        // 기존의 todos 상태 초기화
        dispatch(clearTodos());

        // 중복을 제외하고 새로운 데이터만 처리
        data.forEach((item) => {
          if (!item.shared) {
            const [year, month, day] = item.myScheduleDate.split("-");
            const todo = {
              id: item.myScheduleId,
              year: parseInt(year),
              month: parseInt(month),
              day: parseInt(day),
              shared: item.shared,
              text: item.myScheduleContent,
              writer: item.writerId,
  
            };
            dispatch(createTodo({ todo }));
          } else {
            const [year, month, day] = item.shareScheduleDate.split("-");
            const todo = {
              id: item.shareScheduleId,
              year: parseInt(year),
              month: parseInt(month),
              day: parseInt(day),
              shared: item.shared,
              text: item.shareScheduleContent,
              writer: item.shareScheduleWriterId,
            };
            dispatch(createTodo({ todo }));
          }
        });

        dispatch(
          actionTodos({
            currentDay,
            currentMonth,
            currentYear,
          })
        );
        dispatch(
          dayTodolist({
            currentMonth: currentMonth - 1,
            currentYear,
          })
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [currentDay, currentMonth, currentYear]);


  const handleToggleAndFetch = (id) => {
    dispatch(toggleTodo({ id }));
    dispatch(
      actionTodos({
        currentDay,
        currentMonth,
        currentYear,
      })
    );
    dispatch(
      dayTodolist({
        currentMonth: currentMonth - 1,
        currentYear,
      })
    );
  };

  const handleRemoveAndFetch = (id) => {
    dispatch(removeTodo({ id }));
    dispatch(
      actionTodos({
        currentDay,
        currentMonth,
        currentYear,
      })
    );
    dispatch(
      dayTodolist({
        currentMonth: currentMonth - 1,
        currentYear,
      })
    );
  };
  

  const handleCreateShareToggle = () => {
    setShared((shared)=>!shared)
  }
  const handleCreateToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleCreateChange = (e) => {
    setValue(e.target.value);
  };
  
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`/calendar/setSchedule/userName=SW`, {
        schedule: value,
        date: `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${currentDay.toString().padStart(2, '0')}`,
        share: shared,
      });  

      setValue("");
      setOpen(false);
      console.log(response.data); // Schedule create successfully
    } catch (error) {
      console.error(error);
    }
  };  
  return (
    <TodoTemplateBlock>
      <TodoHead
        currentDay={currentDay}
        currentMonth={currentMonth}
        currentYear={currentYear}
        filteredTodos={filteredTodos}
      />
      
      <TodoItemList
        todos={filteredTodos?.length ? filteredTodos : []}
        handleToggle={handleToggleAndFetch}
        handleRemove={handleRemoveAndFetch}
      />

      <TodoCreate
        open={open}
        value={value}
        handleChange={handleCreateChange}
        handleSubmit={handleCreateSubmit}
        handleToggle={handleCreateToggle}
        currentDay={currentDay}
        currentMonth={currentMonth}
        currentYear={currentYear}
      />
    </TodoTemplateBlock>
  );
};

export default TodoList;
