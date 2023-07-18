import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import TodoItem from "../TodoItem/TodoItem";

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

const TodoItemList = ({ todos, handleToggle, handleRemove }) => {
  return (
    <TodoListBlock>
      {todos.length > 0 ? (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            done={todo.done}
            text={todo.text}
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
      id: PropTypes.number.isRequired,
      done: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    })
  ).isRequired,
  handleToggle: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired
};

export default TodoItemList;
