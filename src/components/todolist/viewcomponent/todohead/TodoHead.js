import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const TodoHeadBlock = styled.div`
  padding: 0px 30px 20px 30px;
  border-bottom: 1px solid #e9ecef;
  h1 {
    margin: 0;
    font-size: 24px;
    color: #343a40;
  }
  .day {
    margin-top: 4px;
    color: #868e96;
    font-size: 18px;
  }
  .tasks-left {
    color: #20c997;
    font-size: 14px;
    margin-top: 30px;
    font-weight: bold;
  }
`;

const TodoHead = ({
  currentDay,
  currentMonth,
  currentYear,
  currentWeek,
  filteredTodos
}) => {
  const week = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일"
  ];
  const rest = filteredTodos.filter(todo => todo.done === false).length;
  return (
    <TodoHeadBlock>
      <h2>
        {currentYear}년 {currentMonth}월 {currentDay}일
      </h2>
      <div className="day">{week[currentWeek]}</div>
      <div className="tasks-left">일정이 {rest}개 남아 있어요.</div>
    </TodoHeadBlock>
  );
};

TodoHead.propTypes = {
  currentDay: PropTypes.number,
  currentMonth: PropTypes.number,
  currentWeek: PropTypes.number,
  currentYear: PropTypes.number,
  filteredTodos: PropTypes.array
};

TodoHead.defaultProps = {
  currentDay: -1,
  currentMonth: -1,
  currentWeek: -1,
  currentYear: -1,
  filteredTodos: []
};

export default TodoHead;
