'use client'

import React, { useState, useEffect } from 'react';
import Link from "next/link"
import WriteBoard from '@/components/WriteBoard';
import PrimarySearchAppBar from './navbar';
import Board from './../types/board'

import {Paper, Box} from '@mui/material';
import { styled } from '@mui/material/styles';
  import Collapse from '@mui/material/Collapse';
  import Button from '@mui/material/Button';
  import Fab from '@mui/material/Fab';
  import AddIcon from '@mui/icons-material/Add';
  import Grid from '@mui/material/Grid';
  
//   import Box from '@mui/material/Box';
  
//   import UpdateBoardForm from './UpdateBoardForm';
//   import BoardDetail from './BoardDetail';
//   import FetchBoards from './api/FetchBoards';
//   import HandleDeleteBoard from './api/HandleDeleteBoard';
//   import IncreaseViewCount from './api/IncreaseViewCount';
//   import './BoardList.css';
// import ""
const Item = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    // ...theme.typography.body2,
    // padding: theme.spacing(1),
    // textAlign: 'center',
    // color: theme.palette.text.secondary,
  }));

const board1:Board = {
    bid : 1,
    nickName : "lin",
    b_title : "Hello",
    b_content : "World",
    b_createdAt : new Date().toLocaleDateString(),
    b_updatedAt : new Date().toLocaleDateString(),
    b_views : 10,
    comments : 0,
    b_recommendations : 0,
};
const board2:Board = {
    bid : 10,
    nickName : "lin2",
    b_title : "world",
    b_content : "HEllo",
    b_createdAt : "230727",
    b_updatedAt : "230737",
    b_views : 13,
    comments : 0,
    b_recommendations : 0,
};





 export default function BoardList():any{
    const [boards, setBoards] = useState<Board[] | null>([]);
    const [selectedBoard, setSelectedBoard] = useState<any | null>(null);
    // const [showAddForm, setshowAddForm] = useState<any>(false);
    const [AddFormClass, setAddFormClass] = useState<any | null>(null);

    function HandleBoardClick(board:any):any{   //게시글 클릭 시
        if (selectedBoard===null){
            setSelectedBoard(board);
        }else if(selectedBoard!=null){
            setSelectedBoard(null);
        }
    }

    function ToggleAddForm():any{
        if (AddFormClass==="formOn") {
            setAddFormClass("formOff");
            console.log("폼꺼짐~!!!")
        } else if (AddFormClass==="formOff") {
            setAddFormClass("formOn");
            console.log("폼켜짐~!!!")
        } else {setAddFormClass("formOn");}
    }

    function handleXButton(){       //일단 Add만
        setAddFormClass("formOff");
    }
    
    useEffect(() => {
        setBoards([board1, board2]);
        console.log(boards);
      }, []);

    // console.log(boards)



    return (
        
        <div>
            <div>
            <h1 style={{ textAlign: 'center' }}>게시판</h1>
            </div>

        <br></br>
  
        <div style={{ position: "absolute", left: "0%", transform: "translate(20%)" }}>
            <Box sx={{width:'1200px'}}>
                <Grid container spacing={5} style={{textAlign:"center"}}>
                    
                    <Grid item xs={0.3}>No</Grid>
                    <Grid item xs={3}>제목</Grid>
                    <Grid item xs={1.2}>작성일자</Grid>
                    <Grid item xs={1}>추천수</Grid>
                    <Grid item xs={1}>조회수</Grid>
                    
                </Grid>
                <br></br><br></br>

                {boards.map(board => (
                    <Grid container sx={{width:'1200px'}}>
                        <React.Fragment key={board.bid}>
                        <Grid container onClick={HandleBoardClick}>
                        <Item>
                            <Grid item xs={0.3}>{board.bid}</Grid>
                            <Grid item xs={3}>{board.b_title}</Grid>
                            <Grid item xs={1}>{board.b_createdAt}</Grid>
                            <Grid item xs={0.7}>{board.b_recommendations.toLocaleString()}</Grid>
                            <Grid item xs={0.7}>{board.b_views.toLocaleString()}</Grid>
                        </Item>
                        </Grid>
                        <Collapse in={selectedBoard && selectedBoard.bid===board.bid}></Collapse>
                        </React.Fragment>
                    </Grid>
                ))}
            </Box>
        </div>

        <Fab variant="extended" onClick={ToggleAddForm} sx={{ position: 'fixed', bottom: '5em', right: '5em' }}>
            <AddIcon sx={{ marginRight: '0.5em' }} />
            게시글 작성하기
        </Fab>

        {AddFormClass && <WriteBoard b_title="" b_content="" FormTitle="새로운 게시글 작성" handleXButton={handleXButton} formClass={AddFormClass} />}
        </div>
      
    );
  }
  