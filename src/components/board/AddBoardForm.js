import React, { useState } from 'react';
import HandleCreateBoard from './api/HandleCreateBoard';

import './BoardList.css';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';


const AddBoardForm = ({refreshBoards, classname, toggleForm }) => {

  const [newBoard, setNewBoard] = useState({ b_title: '', b_content: '' });
  const [formUpDown, setclass] = useState(classname);
  

  const createBoard = async () => {
    try {
      await HandleCreateBoard(newBoard, refreshBoards);
      console.log('Board created:', newBoard);
      refreshBoards();
      setClassName("slideDown");
    } catch (error) {
      console.error('Error creating Board:', error);
    }
  };

  const handleXButton=()=>{
    setClassName();
    refreshBoards();
    // setTimeout(1000);
    toggleForm();
  }

  const setClassName = () =>{
    if(formUpDown==='slideDown'){
        setclass("slideUp");
    }
    else {setclass("slideDown")
  }}
  


  return (
    <Grid container spacing={50}>
      <div id="board-form" className={formUpDown}>
        <h2 style={{ textAlign: 'center' }}>새로운 게시글 작성</h2>
        <div className="close-icon" onClick={handleXButton}>X</div>
        <form></form>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'left' }}>
          <TextField
            id="outlined-basic"
            label="제목"
            variant="standard"
            type="text"
            value={newBoard.b_title}
            onChange={e => setNewBoard({ ...newBoard, b_title: e.target.value })}
          />
        </div>


      <br />

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <FormControl fullWidth variant="standard">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'left' }}>
          <TextField
            id="outlined-basic"
            label="내용"
            variant="standard"
            type="text"
            value={newBoard.b_content}
            onChange={e => setNewBoard({ ...newBoard, b_content: e.target.value })}
          />
        </div>
        </FormControl>
      </div>

      <br />

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button onClick={createBoard}>게시글 작성 완료</Button>
      </div>
      </div>
    </Grid>
  );
};


export default AddBoardForm;
