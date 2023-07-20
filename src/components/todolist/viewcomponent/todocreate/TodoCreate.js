import PropTypes from "prop-types";
import styled, { css } from 'styled-components';
import AddIcon from '@mui/icons-material/Add';


const CircleButton = styled.div`
  background: #38d9a9;
  &:hover {
    background: #38d9a9;
  }
  &:active {
    background: #20c997;
  }

  z-index: 5;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: block;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, -20%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.125s all ease-in;
  ${props =>
    props.open &&
    css`
      background: #ff6b6b;
      &:hover {
        background: #ff8787;
      }
      &:active {
        background: #fa5252;
      }
      transform: translate(-50%, -20%) rotate(45deg);
    `}
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
`;

const InsertForm = styled.form`
  background: #f8f9fa;
  padding-left: 32px;
  padding-top: 32px;
  padding-right: 32px;
  padding-bottom: 72px;

  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;
const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const CheckboxLabel = styled.label`
  margin-left: 8px;
  font-size: 16px;
`;
const TodoCreate = ({
  open,
  value,
  handleChange,
  handleSubmit,
  handleToggle,
  shared, // Add the shared prop
  handleShareToggle
}) => {
  return (
    <>
      {open && (
        <InsertFormPositioner>
          <InsertForm onSubmit={handleSubmit}>
            <Input
              autoFocus
              placeholder="일정을 등록한 후, Enter를 누르세요"
              onChange={handleChange}
              value={value}
            />
            <CheckboxWrapper>
              <input
                type="checkbox"
                checked={shared}
                onChange={handleShareToggle} // Use the handleCheckboxChange prop
              />
              <CheckboxLabel>연인과 공유</CheckboxLabel>
            </CheckboxWrapper>
          </InsertForm>
        </InsertFormPositioner>
      )}
      <CircleButton onClick={handleToggle} open={open}>
        <AddIcon />
      </CircleButton>
    </>
  );
};

TodoCreate.propTypes = {
  open: PropTypes.bool,
  value: PropTypes.string,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleToggle: PropTypes.func
};

TodoCreate.defaultProps = {
  open: false,
  value: "",
  handleChange: () => {
    console.log("handleChange is null.");
  },
  handleSubmit: () => {
    console.log("handleChange is null.");
  },
  handleToggle: () => {
    console.log("handleChange is null.");
  }
};

export default TodoCreate;
