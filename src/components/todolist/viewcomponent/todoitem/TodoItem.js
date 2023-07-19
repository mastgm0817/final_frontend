import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
const Remove = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 13px;
  cursor: pointer;
  &:hover {
    color: #ff6bc6;
  }
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`;

const CheckCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border: 1px solid #ced4da;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  cursor: pointer;
  ${({ done }) =>
    done &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

const Text = styled.div`
  flex: 1;
  font-size: 16px;
  font-weight: 700;
  color: #495057;
  ${({ done }) =>
    done &&
    css`
      color: #ced4da;
    `}
`;

const TodoItem = ({ id=0, done, text = "", handleRemove, handleToggle }) => {
  return (
    <TodoItemBlock>
      <CheckCircle done={done.toString()} onClick={() => handleToggle(id)}>
        {done && <DoneIcon fontSize="small" />}
      </CheckCircle>
      <Text done={done? 1:0}>{text}</Text>
      <Remove onClick={() => handleRemove(id)}>
        <DeleteIcon fontSize="small" />
      </Remove>
    </TodoItemBlock>
  );
};

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  done: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  handleRemove: PropTypes.func.isRequired,
  handleToggle: PropTypes.func.isRequired
};
export default TodoItem;
