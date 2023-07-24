import React, { useState, useEffect } from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper
} from '@mui/material'
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import AddBoardForm from './AddBoardForm';
import UpdateBoardForm from './UpdateBoardForm';
import BoardDetail from './BoardDetail';
import FetchBoards from './api/FetchBoards';
import HandleDeleteBoard from './api/HandleDeleteBoard';
import IncreaseViewCount from './api/IncreaseViewCount';
import './BoardList.css';

const BoardList = () => {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [extendedBoard, setExtendedBoard] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  // const [showUpdateForm, setShowUpdateForm] = useState(false);


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


  const handleBoardClick = async (board) => {

    setSelectedBoard(board);
    
    try {
      await IncreaseViewCount(board.bid);
      const updatedBoards = await FetchBoards();
      setBoards(updatedBoards);
    } catch(error) {
      console.error("Error increasing view count:", error);
    }
    FetchBoards();
    setExtendedBoard(!extendedBoard);
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

const showMyBoard = () => {

  
}

  
//================================================================

  return (
    <div>
      <div>
        <h1 style={{ textAlign: 'center' }}>게시판</h1>
      </div>

      <Box>
        <TableContainer sx={{padding:'50px', width: '70%', align:'center'}}>
          <Table sx={{align:'center'}}>

            <TableHead sx={{ backgroundColor: '#1976D2' }}>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>No</TableCell>
                <TableCell style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>제목</TableCell>
                <TableCell style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>작성일자</TableCell>
                <TableCell style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>추천수</TableCell>
                <TableCell style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>조회수</TableCell>
                <TableCell style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>      </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {boards.map(board => (

                <React.Fragment key={board.bid}>
                      <TableRow onClick={() => handleBoardClick(board)} className='tablerow' key={board.bid}>
                          <TableCell style={{ width: '10%', textAlign:"center"}}>{board.bid}</TableCell>
                          <TableCell style={{ width: '20%', textAlign:"center" }}>{board.b_title}</TableCell>
                          <TableCell style={{ width: '15%', textAlign:"center" }}>{board.b_createdAt}</TableCell>
                          <TableCell style={{ width: '15%', textAlign:"center" }}>{board.b_recommendations}</TableCell>
                          <TableCell style={{ width: '15%', textAlign:"center" }}>{board.b_views}</TableCell>

                      </TableRow>

                      <TableRow>
                        <td></td>
                          <td><Collapse in={selectedBoard && selectedBoard.bid === board.bid} timeout="auto" unmountOnExit onClick={setSelectedBoard}>
                            <BoardDetail board={selectedBoard} refreshBoards={fetchData} />
                          </Collapse></td>
                      </TableRow>
                      </React.Fragment>
              ))}
          </TableBody>
          </Table>
        </TableContainer>
        {/* {showUpdateForm && <UpdateBoardForm Board={selectUpdate} toggleForm={toggleUpdateForm} refreshBoards={fetchData}/>} */}
        
      </Box>
      
        <p><Fab variant="extended" onClick={toggleAddForm} sx={{ position: 'fixed', bottom: '5em', right: '5em' }}>
          <AddIcon sx={{ marginRight: '0.5em' }} />
          게시글 작성하기
        </Fab></p>
        {showAddForm && <AddBoardForm refreshBoards={fetchData} classname={"slideUp"} toggleForm={toggleAddForm}/>}

        <p><Fab variant="extended" onClick={showMyBoard} sx={{ position: 'fixed', bottom: '5em', right: '5em' }}>
          내글보기
        </Fab></p>

        </div>

  );

}

export default BoardList;