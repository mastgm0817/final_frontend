import axios from 'axios';
import Board from '@/types/board';

const HandleDeleteBoard = async (board:Board, fetchData:any) => {
    const BoardId=board.bid;
    // console.log(BoardId)
    try {
        const response = await axios.delete(`http://localhost:8080/api/boards/${BoardId}`, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
        console.log(`Board deleted:${BoardId}`, response.data);
    } catch (error) {
        console.error('Error deleting Board:', error);
        throw error;
    }
};


export default HandleDeleteBoard;  
