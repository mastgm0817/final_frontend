'use client'

import React, { useState, useEffect } from 'react';
import { useSession } from "next-auth/react"
import Link from "next/link";
import PrimarySearchAppBar from './navbar';
import Board from './../types/board'
import RootLayout from '../app/layout';

import CreateBoard from './api/board/HandleCreateBoard';
import WriteBoard from '../components/WriteBoard';
import HandleUpdateBoard from './api/board/HandleUpdateBoard';
import HandleCreateBoard from './api/board/HandleCreateBoard';
import HandleDeleteBoard from './api/board/HandleDeleteBoard';
import HandleCreateComment from './api/board/HandleCreateComment'
import IncreaseViewCount from './api/board/IncreaseViewCount';
import FetchBoards from './api/test/fetchPost';

// import BoardDetail from '@/components/BoardDetail';

import {Paper, Box, TextField} from '@mui/material';
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

const defaultBoard:Board={
    bid : 0,
    nickName : " ",
    b_title : " ",
    b_content : " ",
    b_createdAt:" ",
    b_updatedAt:"",
    b_views : 0,
    comments : 0,
    b_recommendations : 0
}

function BoardDetail(props:any){
    const [comment, setComment] = useState<string>('');
    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComment(e.target.value);
    };

    return(
        <Box sx={{align:"center"}} className={"Board-to-show"}>
            <div style={{marginLeft:"30"}}>

                <h2>{props.selectedBoard.b_title}</h2>

                <table style={{ borderCollapse: 'collapse' }}>
                <tbody><tr className="detail-additional"><td style={{ width: '10%' }}>작성자&nbsp; {props.selectedBoard.nickName}</td></tr>
                    <tr className="detail-additional"><td style={{ width: '10%' }}>작성일&nbsp; {props.selectedBoard.b_createdAt}</td><td>&nbsp;&nbsp;&nbsp;&nbsp;</td>
                        <td>최근 수정&nbsp; {props.selectedBoard.b_updatedAt}</td></tr>
                    <tr className="detail-additional"><td>조회수&nbsp; {props.selectedBoard.b_views+1}</td><td>&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>
                    <tr></tr>

                    {/* 수정 */}
                    <tr><td><EditIcon onClick={() => {props.ToggleUpdateForm(props.selectedBoard);}}></EditIcon></td>
                    {}
                    {/* 삭제 */}
                        <td><DeleteIcon onClick={(event) => {event.stopPropagation(); props.DeleteBoard(props.selectedBoard); }}/></td>
                    </tr>
                    <tr><td><p style={{ marginBottom: '1em' }}>{props.selectedBoard.b_content}</p></td></tr>
                    {/* 추천 */}
                    <tr><td><Button onClick={(event) => {event.stopPropagation(); props.HandleRecommendButton(props.selectedBoard.bid)}}>추천 {props.selectedBoard.b_recommendations}</Button></td></tr>
                    <tr><td><Button></Button></td></tr>
                    
                    
                    <tr><td><h4>댓글 목록</h4></td></tr>
                    <tr></tr>
                    <tr><td><div><TextField
                            id="outlined-basic"
                            label="댓글"
                            variant="standard"
                            type="text"
                            value={comment}
                            onChange={handleCommentChange}
                            ></TextField></div></td> 
                            <Button onClick={(event) => {props.handleCommentSubmit(event, comment);}}>제출</Button></tr>
                    </tbody>
                    </table>
                     
                    
                    </div>
        </Box>
    );
}

function Logined(props:any):any{

    const {data: session} = useSession();
    const [boards, setBoards] = useState<Board[]>([]);//board목록
    const [AddFormClass, setAddFormClass] = useState<String | null>(null);//글추가폼의 class
    const [UpdateFormClass, setUpdateFormClass] = useState<String | null>(null);
    const [newBoard, CreateNewBoard] = useState<Board>({...defaultBoard});//새로운 board
    const [selectedBoard, setSelectedBoard] = useState<Board>(defaultBoard);//선택된 board

    
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
    function HandleBoardClick(event:any, clickedBoard:Board):any {   //게시글 클릭 시 게시글은 clicked
        if (selectedBoard === null || selectedBoard.bid !== clickedBoard.bid){
            setSelectedBoard(clickedBoard);     //게시글을 활성화상태로
            IncreaseViewCount(clickedBoard);
            console.log(clickedBoard.bid + "번 게시글 조회됨");
        }else if(selectedBoard !== null && selectedBoard.bid === clickedBoard.bid){
            setSelectedBoard(defaultBoard);
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
    async function ToggleUpdateForm(board: Board) {
        setSelectedBoard(prevState => {
          if (UpdateFormClass === "formOn") {
            setUpdateFormClass("formOff");
            return defaultBoard;
          } else {
            setUpdateFormClass("formOn");
            return board;
          }
        });
    }
    function handleAddXButton(){    
        setAddFormClass("formOff");
    }
    function handelUpdateXButton(){     
        setSelectedBoard(defaultBoard);
        setUpdateFormClass("formOff");
    }
    async function UpdateBoard(UpdateBoard:Board){
        await HandleUpdateBoard(UpdateBoard);
        setSelectedBoard(defaultBoard);
        setUpdateFormClass("formOff");
        fetchData();   
    }
    async function CreateBoard(newBoard:Board){
        newBoard.nickName=`${session?session.user?.name:null}`
        await HandleCreateBoard(newBoard);
        ToggleAddForm();
        fetchData();
    }
    async function DeleteBoard(board:Board) {
        await HandleDeleteBoard(board, fetchData);
        fetchData();
    }
    async function HandleRecommendButton(){
        console.log(selectedBoard.bid+"번 게시글 추천댐")
        fetchData();
    }
    async function SubmitComment(board:Board, commentText: string) {
        const comment: Comment = {
            id: Date.now(),
            content: commentText,
            createdAt: new Date().toISOString(),
            author: session ? session.user?.name : 'Anonymous'
        };
        await HandleCreateComment(board, comment);
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
                        <Grid item xs={2}>작성자</Grid>
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
                                    <Grid item xs={2}>{board.nickName}</Grid>
                                    <Grid item xs={1}>{board.b_recommendations.toLocaleString()}</Grid>
                                    <Grid item xs={1}>{board.b_views.toLocaleString()}</Grid>
                                </Grid>
                            </Item>

                            <br></br>
                            <Collapse in={selectedBoard && selectedBoard.bid === board.bid}>
                                <BoardDetail selectedBoard={board} 
                                             ToggleUpdateForm={() => ToggleUpdateForm(board)} 
                                             DeleteBoard={DeleteBoard} 
                                             HandleRecommendButton={HandleRecommendButton} 
                                             handleCommentSubmit={SubmitComment}/>
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


 export default function BoardList(props:any):any{

    return (
        
        <RootLayout>
               <Logined />
        </RootLayout>
    );

  }
  