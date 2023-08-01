import React, { useState, useEffect } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';
import {Paper, Box, TextField, Button} from '@mui/material';

import Board from '@/types/board';
import Comment from '@/types/comment';
import HandleCreateComment from '@/pages/api/board/HandleCreateComment';
// import FetchComments from '@/pages/api/board/fetchComments';


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

const defaultComment:Comment={
    cid:0,
    nickName:" ",
    content:" "
}

function BoardDetail(props:any){
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<Comment>({...defaultComment})

    // const fetchData = async () => {
    //     try {
    //         const response = await FetchComments(props.selectedBoard.bid);
    //         setComments(response);
    //     } catch (error) {
    //         console.error('Error fetching boards:', error);
    //     }
    // };
    // useEffect(() => {
    //     fetchData();
    // }, []);

    return(
        <Box sx={{align:"center"}} className={"Board-to-show"}>
            <div style={{marginLeft:"30"}}>

                <Grid sx={{padding:"5px"}}>

                    <Grid><h2><b>{props.selectedBoard.b_title}</b></h2></Grid>
                    <br></br>

                    <Grid>
                        <Grid className="detail-additional">{props.selectedBoard.nickName}</Grid>
                    </Grid>

                    <Grid>
                        <Grid className="detail-additional">작성일&nbsp; {props.selectedBoard.b_createdAt}</Grid>
                        <Grid className="detail-additional">최근 수정&nbsp; {props.selectedBoard.b_updatedAt}</Grid>
                    </Grid>
                    <Grid>
                        <Grid className="detail-additional">조회수&nbsp; {props.selectedBoard.b_views}</Grid>
                    </Grid>
                        <br></br>
                        <Grid>
                            <Grid>
                            {/* 수정 */}
                            <EditIcon onClick={() => {props.ToggleUpdateForm(props.selectedBoard);}} />
                            {/* 삭제 */}
                            <DeleteIcon onClick={(event) => {event.stopPropagation(); props.DeleteBoard(props.selectedBoard); }}/>
                            <br></br>
                            </Grid>
                        </Grid>
                        <br></br>

                    {/* 내용 */}
                    <Grid><p style={{ marginBottom: '1em' }}>{props.selectedBoard.b_content}</p></Grid>
                    <br></br>

                    {/* 추천 */}
                    <Grid><Button onClick={(event) => {event.stopPropagation(); props.HandleRecommendButton(props.selectedBoard.bid)}}>추천 {props.selectedBoard.b_recommendations}</Button></Grid>
                    <Grid><Button></Button></Grid>
                    <br></br>
                    <Grid><h4>댓글 목록</h4></Grid>

                    <Grid>
                        {comments && comments.map(comment => (
                            <React.Fragment key={comment.cid}>
                                <Grid container spacing={5} style={{textAlign:"center"}}>
                                    <Grid item xs={0.3}>{comment.cid}</Grid>
                                    <Grid item xs={2}>{comment.nickName}</Grid>
                                    <Grid item xs={2}>{comment.content}</Grid>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                    <hr></hr>
                    <br></br>

                    <Grid>
                        <div><TextField
                                id="outlined-basic"
                                label="댓글"
                                variant="standard"
                                type="text"
                                onChange={ (event:React.ChangeEvent<HTMLInputElement>) => setNewComment({ ...newComment, content: event.target.value })}
                                ></TextField>
                        </div> 
                        <Button onClick={()=>HandleCreateComment(newComment,props.selectedBoard.bid)}>제출</Button>
                    </Grid>

                </Grid>
            </div>
        </Box>
    );
}

export default BoardDetail;