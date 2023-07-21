import React, {useState, location} from 'react';
import './BoardList.css';

import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import Handlerecommendations from './api/Handlerecommendations';
import FetchBoards from './api/FetchBoards';
import HandleDeleteBoard from './api/HandleDeleteBoard';
import UpdateBoardForm from './UpdateBoardForm';


const BoardDetail = ({ board }) => {

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectUpdate, setUpdateBoard] = useState(null);
  const [boards, setBoards] = useState([]);

  const fetchData = async () => {
    try {
      const response = await FetchBoards();
      setBoards(response);
    } catch (error) {
      console.error('Error fetching boards:', error);
    }
  };

  const handleUpdateForm = (board,) => {
    // event.stopPropagation();
    setUpdateBoard(board);
    setShowUpdateForm(true);
  };

  const toggleUpdateForm = () => {
    // setShowUpdateForm(!showUpdateForm);
    // // console.log("토글됨")
  };

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

  const handleDeleteClick = async (board) => {
    try {
      await HandleDeleteBoard(board.bid);
      // const updatedBoards = boards.filter(p => p.bid !== board.bid);
      // setBoards(updatedBoards);
      console.log('Board deleted:', board);
      FetchBoards();

    } catch (error) {
        console.error('Error deleting board:', error);
      }
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

                {/* 수정 */}
                <tr><td><EditIcon onClick={handleUpdateForm}></EditIcon></td>
                {}
                {/* 삭제 */}
                    <td><DeleteIcon onClick={(event) => {event.stopPropagation(); handleDeleteClick(board);}}/></td>
                </tr>

                <tr><td><p style={{ marginBottom: '1em' }}>{board.b_content}</p></td></tr>
                
                <tr><td><Button onClick={(event) => {event.stopPropagation(); HandlerecommendButton(board.bid)}}>추천</Button></td></tr>
                {/* <tr><td><p style={{ wordBreak: 'break-all' }}>{Board.comments}</p></td></tr> */}
                </tbody>
            </table>
            </div>


             <h4>댓글 목록</h4>

             {showUpdateForm && <UpdateBoardForm/>}

        </Box>
    );
};  

export default BoardDetail;
