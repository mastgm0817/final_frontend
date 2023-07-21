import React from 'react';
import './BoardList.css';

import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Handlerecommendations from './api/Handlerecommendations';
import FetchBoards from './api/FetchBoards';


const BoardDetail = ({ board }) => {

    const HandlerecommendButton = async (board) => {
        
        try {
          await Handlerecommendations(board.bid);
          const updatedBoards = await FetchBoards();
        //   setBoards(updatedBoards);
        } catch(error) {
          console.error("Error increasing view count:", error);
        }
        FetchBoards();
      };


    return (
        <Box sx={{align:"center"}}>
            <div style={{marginLeft:"30"}}>
            <h2 style={{ wordBreak: 'break-all' }}>{board.b_title}</h2>
            {/* <p style={{ marginBottom: '1em' }}>{Board.author}</p><br /> */}
            <table style={{ borderCollapse: 'collapse' }}>
                <tbody><tr className="detail-additional"><td style={{ width: '10%' }}>작성일&nbsp; {board.b_createdAt}</td><td>&nbsp;&nbsp;&nbsp;&nbsp;</td><td>최근 수정&nbsp; {board.b_updatedAt}</td></tr>
                <tr className="detail-additional"><td>조회수&nbsp; {board.b_views}</td><td>&nbsp;&nbsp;&nbsp;&nbsp;</td><td>추천수&nbsp; {board.b_recommendations}</td></tr>
                <tr></tr>
                <tr></tr>
                <tr><td><p style={{ marginBottom: '1em' }}>{board.b_content}</p></td></tr>
                <tr><td><Button onClick={(event) => {event.stopPropagation(); HandlerecommendButton(board.bid)}}>추천</Button></td></tr>
                {/* <tr><td><p style={{ wordBreak: 'break-all' }}>{Board.comments}</p></td></tr> */}
                </tbody>
            </table>
            </div>


             <h4>댓글 목록</h4>

        </Box>
    );
};  

export default BoardDetail;
