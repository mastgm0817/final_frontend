import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import TodoItem from "../todoitem/TodoItem";

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

const TodoItemList = ({ todos, handleToggle, handleRemove }) => {
  return (
    <TodoListBlock>
      {todos.length >0  ? (
        todos.map((todo) => (
          <TodoItem
            key={todo.id+`-${todo.shared}`}
            id={todo.id || 0}
            done={todo.done || false}
            text={todo.text || ""}
            handleRemove={handleRemove}
            handleToggle={handleToggle}
          />
        ))
      ) : (
        <div>No schedules found.</div>
      )}
    </TodoListBlock>
  );
};

TodoItemList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      done: PropTypes.bool,
      text: PropTypes.string
    })
  ).isRequired,
  handleToggle: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
};

export default TodoItemList;
