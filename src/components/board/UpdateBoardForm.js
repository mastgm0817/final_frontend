import React, { useState } from 'react';
import HandleUpdateBoard from './api/HandleUpdateBoard';
import './BoardList.css';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const UpdateBoardForm = ({ board, toggleForm, refreshBoards, classname }) => {

  const [updatedBoard, setUpdatedBoard] = useState(board?{ 
    title: board.b_title, 
    content: board.b_content, 
    updatedAt: new Date().toISOString()
  } : null);

  const [formUpDown, setclass] = useState(classname);
  const [isclosed, setcloseed] = useState(false)

  const setClassName = () =>{
    if(formUpDown==='slideDown'){
      setclass("slideUp");
    }
    else {setclass("slideDown")
  }}
  

  const updatingBoard = async () => {
    try {
      await HandleUpdateBoard(board.b_bid, updatedBoard, refreshBoards);
      console.log('Board updated:', updatedBoard);
      refreshBoards();
      setClassName();
      setcloseed(true);
      toggleForm();
    } catch (error) {
      console.error('Error updating board:', error);
    }
  };


  

  if (!updatedBoard) {
    return null;
  }

  const handleXButton=()=>{
    setclass("slideDown");
    setUpdatedBoard(null);
    refreshBoards();
    toggleForm();
  }

  return (
    <div id="board-form" className={formUpDown}>
      <h2 style={{ textAlign: 'center' }}>게시글 수정</h2>
      <div className="close-icon" onClick={handleXButton} >X</div>
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <TextField id="outlined-basic" label="제목" variant="standard"
          type="text"
          value={updatedBoard.b_title}
          onChange={e => setUpdatedBoard({ ...updatedBoard, title: e.target.value })}
        />
      </div>

      <br />

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <TextField id="outlined-basic" label="제목" variant="standard"
          value={updatedBoard.b_content}
          onChange={e => setUpdatedBoard({ ...updatedBoard, content: e.target.value })}
        />
      </div>

      <br />

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button onClick={updatingBoard}>게시글 수정</Button>
      </div>
    </div>
  );
};

export default UpdateBoardForm;
