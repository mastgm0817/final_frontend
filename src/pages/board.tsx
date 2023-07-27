import React, { useState, useEffect } from 'react';
import Link from "next/link"

import {Paper} from '@mui/material';
import { styled } from '@mui/material/styles';
  import Collapse from '@mui/material/Collapse';
  import Button from '@mui/material/Button';
  import Fab from '@mui/material/Fab';
  import AddIcon from '@mui/icons-material/Add';
  import Grid from '@mui/material/Grid';
  import Box from '@mui/material/Box';
//   import AddBoardForm from './AddBoardForm';
//   import UpdateBoardForm from './UpdateBoardForm';
//   import BoardDetail from './BoardDetail';
//   import FetchBoards from './api/FetchBoards';
//   import HandleDeleteBoard from './api/HandleDeleteBoard';
//   import IncreaseViewCount from './api/IncreaseViewCount';
//   import './BoardList.css';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


 export default function BoardList():any{
    const [boards, setBoards] = useState<any[]>([]);
    const [selectedBoard, setSelectedBoard] = useState<any | null>(null);
    const [showAddForm, setShowAddForm] = useState<boolean>(false);

    function HandleBoardClick(board:any):any{   //게시글 클릭 시
        if (selectedBoard===null){
            setSelectedBoard(board);
        }else if(selectedBoard!=null){
            setSelectedBoard(null);
        }
    }

    function ToggleAddForm():any{
        setShowAddForm(true);
    }
  
    return (
      <div>
        <div>
          <h1 style={{ textAlign: 'center' }}>게시판</h1>
        </div>
  
        <Box>
            <Grid container>
                  <Grid xs={1}>No</Grid>
                  <Grid xs={8}>제목</Grid>
                  <Grid xs={3}>작성일자</Grid>
                  <Grid xs={1}>추천수</Grid>
                  <Grid xs={1}>조회수</Grid>
            </Grid>

            {boards.map(board => (
                <React.Fragment key={board.bid}>
                <Grid container onClick={HandleBoardClick}>
                      <Grid xs={1}>{board.bid}</Grid>
                      <Grid xs={8}>{board.b_title}</Grid>
                      <Grid xs={3}>{board.b_createdAt}</Grid>
                      <Grid xs={1}>{board.b_recommendations}</Grid>
                      <Grid xs={1}>{board.b_views}</Grid>
                </Grid>
                <Collapse in={selectedBoard.bid===board.bid}></Collapse>
                </React.Fragment>
            ))}
        </Box>

        {/* <Fab variant="extended" onClick={toggleAddForm} sx={{ position: 'fixed', bottom: '5em', right: '5em' }}> */}
        <Link href="/add">
            <a>
                <Fab variant="extended" onClick={ToggleAddForm} sx={{ position: 'fixed', bottom: '5em', right: '5em' }}>
                <AddIcon sx={{ marginRight: '0.5em' }} />
                게시글 작성하기
                </Fab>
            </a>
        </Link>

        {/* {showAddForm && <AddBoardForm refreshBoards={fetchData} classname={"slideUp"} toggleForm={toggleAddForm}/>} */}
        {showAddForm && <AddBoard />}
    </div>
    );
  }
  