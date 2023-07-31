'use client'

import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react"
import Link from "next/link";
import PrimarySearchAppBar from './navbar';
import Board from './../types/board'
import RootLayout from '../app/layout';

import CreateBoard from './api/board/HandleCreateBoard';
import WriteBoard from '../components/WriteBoard';
import HandleUpdateBoard from './api/board/HandleUpdateForm';
import HandleCreateBoard from './api/board/HandleCreateBoard';
import HandleDeleteBoard from './api/board/HandleDeleteBoard';
import FetchBoards from './api/test/fetchPost';
// import BoardDetail from '@/components/BoardDetail';

import {Paper, Box} from '@mui/material';
import { styled } from '@mui/material/styles';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

  
//   import UpdateBoardForm from './UpdateBoardForm';
//   import FetchBoards from './api/FetchBoards';
//   import HandleDeleteBoard from './api/HandleDeleteBoard';
//   import IncreaseViewCount from './api/IncreaseViewCount';
//   import './BoardList.css';
// import ""

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    // ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    width:'1200px'
    // color: theme.palette.text.secondary,
    // display: 'inline-flex'
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
    b_createdAt : new Date().toLocaleDateString(),
    b_updatedAt : new Date().toLocaleDateString(),
    b_views : 13,
    comments : 0,
    b_recommendations : 0,
};

const defaultBoard:Board={
    bid : 0,
    nickName : " ",
    b_title : " ",
    b_content : " ",
    // b_createdAt : " ",
    // b_updatedAt : " ",
    b_views : 0,
    comments : 0,
    b_recommendations : 0
}

function BoardDetail(props:any){
    // console.log(props.boardToShow)
    console.log(props.boardToShow.b_title)
    return(
        <Box sx={{align:"center"}} className={"Board-to-show"}>
            <div style={{marginLeft:"30"}}>

                <h2>{props.boardToShow.b_title}</h2>

                <table style={{ borderCollapse: 'collapse' }}>
                <tbody><tr className="detail-additional"><td style={{ width: '10%' }}>작성자&nbsp; {props.boardToShow.nickName}</td></tr>
                    <tr className="detail-additional"><td style={{ width: '10%' }}>작성일&nbsp; {props.boardToShow.b_createdAt}</td><td>&nbsp;&nbsp;&nbsp;&nbsp;</td><td>최근 수정&nbsp; {props.boardToShow.b_updatedAt}</td></tr>
                    <tr className="detail-additional"><td>조회수&nbsp; {props.boardToShow.b_views+1}</td><td>&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>
                    <tr></tr>

                    {/* 수정 */}
                    <tr><td><EditIcon onClick={(event) => {props.ToggleUpdateForm(event, props.boardToShow);}}></EditIcon></td>
                    {}
                    {/* 삭제 */}
                        <td><DeleteIcon onClick={(event) => {event.stopPropagation(); props.DeleteBoard(props.boardToShow);}}/></td>
                    </tr>

                    <tr><td><p style={{ marginBottom: '1em' }}>{props.boardToShow.b_content}</p></td></tr>
                    
                    {/* 추천 */}
                    {/* <tr><td><Button onClick={(event) => {event.stopPropagation(); props.HandleRecommendButton(props.board.bid)}}>추천 {props.board.b_recommendations}</Button></td></tr> */}
                    <tr><td><Button></Button></td></tr>
                    {/* <tr><td><p style={{ wordBreak: 'break-all' }}>{Board.comments}</p></td></tr> */}
                </tbody>
                </table>
            </div>
             <h4>댓글 목록</h4>
        </Box>
    );
}

function Logined(props:any):any{

    const {data: session} = useSession();
    const [boards, setBoards] = useState<Board[]>([]);
    const [boardToShow, setBoardToShow] = useState<Board>(defaultBoard);
    const [AddFormClass, setAddFormClass] = useState<String | null>(null);
    const [newBoard, CreateNewBoard] = useState<Board>({...defaultBoard});
    const [selectedBoard, setSelectedBoard] = useState<Board>(defaultBoard);
    const [UpdateFormClass, setUpdateFormClass] = useState<String | null>(null);


    
    const fetchData = async () => {
        try {
            const response = await FetchBoards();
            setBoards(response);
        } catch (error) {
            console.error('Error fetching boards:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    
    function HandleBoardClick(event:any, clickedBoard:Board):any {   //게시글 클릭 시
        if (boardToShow === null || boardToShow.bid !== clickedBoard.bid){
            setBoardToShow(clickedBoard);
            console.log(boardToShow);
        }else if(boardToShow !== null && boardToShow.bid === clickedBoard.bid){
            setBoardToShow(defaultBoard);
        }
    }

    function ToggleAddForm():any{
        if (AddFormClass==="formOn") {
            setAddFormClass("formOff");
        } else if (AddFormClass==="formOff") {
            setAddFormClass("formOn");
            CreateNewBoard(newBoard);
        } else {setAddFormClass("formOn");}
    }

    function ToggleUpdateForm(board:Board):any{
        if (UpdateFormClass==="formOn") {
            setSelectedBoard(defaultBoard);
            setUpdateFormClass("formOff");
        } else if (UpdateFormClass==="formOff") {
            setSelectedBoard(board)
            setUpdateFormClass("formOn");
        } else {setUpdateFormClass("formOn");}
    }

    function handleAddXButton(){    
        setAddFormClass("formOff");
    }
    function handelUpdateXButton(){     
        setUpdateFormClass("formOff");
    }
    function UpdateBoard(UpdateBoard:Board){
        HandleUpdateBoard(UpdateBoard);    
    }
    function CreateBoard(newBoard:Board){
        newBoard.nickName=`${session.user?.name}`
        // newBoard.b_createdAt=new Date().toLocaleDateString();
        // newBoard.b_updatedAt=new Date().toLocaleDateString();
        HandleCreateBoard(newBoard);
        ToggleAddForm();
        fetchData();
    }
    function DeleteBoard(board:Board){
        HandleDeleteBoard(board);
    }
    

    if (session){
        const userName=session.user?.name;
        return session ? (

            <>
            {/* <Logined /> */}

            <div>
                <h1 style={{ textAlign: 'center' }}>게시판</h1><br></br>
            </div>

            <div style={{ position: "absolute", left: "0%", transform: "translate(20%)" }}>
                <Box sx={{width:'1200px'}}>
                    <Grid container spacing={5} style={{textAlign:"center"}}>
                        <Grid item xs={0.3}>No</Grid>
                        <Grid item xs={3}>제목</Grid>
                        <Grid item xs={2}>작성일자</Grid>
                        <Grid item xs={1}>추천수</Grid>
                        <Grid item xs={1}>조회수</Grid>
                    </Grid>
                    <br></br>

                    {boards && boards.map(board => (
                        <React.Fragment key={board.bid}>
                            <Item onClick={(event) => HandleBoardClick(event, board)}>
                                <Grid container spacing={5} style={{textAlign:"center"}}>
                                    <Grid item xs={0.3}>{board.bid}</Grid>
                                    <Grid item xs={3}>{board.b_title}</Grid>
                                    <Grid item xs={2}>{board.b_createdAt.toLocaleString()}</Grid>
                                    <Grid item xs={1}>{board.b_recommendations.toLocaleString()}</Grid>
                                    <Grid item xs={1}>{board.b_views.toLocaleString()}</Grid>
                                </Grid>
                            </Item>

                            <br></br>
                            <Collapse in={boardToShow && boardToShow.bid === board.bid}>
                                <BoardDetail boardToShow={boardToShow} ToggleUpdateForm={() => ToggleUpdateForm(selectedBoard)} DeleteBoard={DeleteBoard}/>
                            </Collapse>
                        </React.Fragment>
                        ))}
                </Box>

            </div>

            <Fab variant="extended" onClick={ToggleAddForm} sx={{ position: 'fixed', bottom: '5em', right: '5em' }}>
            게시글 작성하기
            </Fab>
            
            {AddFormClass && 
                <WriteBoard 
                            board={{...defaultBoard}}
                            FormTitle="새로운 게시글 작성" 
                            handleXButton={handleAddXButton} 
                            formClass={AddFormClass}
                            BoardComplete={CreateBoard} />}

            {UpdateFormClass && 
                <WriteBoard 
                            board={{...selectedBoard}}
                            FormTitle="게시글 수정"  
                            handleXButton={handelUpdateXButton} 
                            formClass={UpdateFormClass}
                            BoardComplete={UpdateBoard} />}
            </>
        ):<div>로그인해주세용</div>}
}




//========================================================================

 export default function BoardList(props:any):any{

    //=====================================================================================================

    return (
        <RootLayout>
               <Logined />
        </RootLayout>
    );

  }
  