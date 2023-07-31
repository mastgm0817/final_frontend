import axios from 'axios';
import Board from '@/types/board';

const HandleUpdateBoard = async (board:Board) => {

    const BoardId=board.bid;
    
    // try {
    //     const response = await axios.put(`http://localhost:8080/api/boards/${BoardId}`, board, {
    //         headers: {
    //             'Content-Type': 'application/json; charset=utf-8'
    //         }
    //     });
    //     // refreshBoards();
    //     console.log('Board updated:', response.data);
    // } catch (error) {
    //     console.error('Error updating Board:', error);
    //     throw error;
    // }


};

export default HandleUpdateBoard;