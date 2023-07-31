import axios from 'axios';
import Board from '../../../types/board';
import { SessionProvider } from "next-auth/react"

const HandleCreateBoard = async (newBoard:Board) => {
    // console.log(newBoard);
    try {
        const response = await axios.post('http://localhost:8080/api/boards', newBoard, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
        console.log('Board created:', response.data);
        // refreshBoards();
    } catch (error) {
        console.error('Error creating Board:', error);
        throw error;
    }

};

export default HandleCreateBoard;


// const HandleCreateBoard = async (newBoard) => {
//   try {
//       const response = await axios.post('/api/boards', newBoard, {
//           headers: {
//               'Content-Type': 'application/json; charset=utf-8'
//           }
//       });
//       console.log('Board created:', response.data);
//       refreshBoards();
//   } catch (error) {
//       console.error('Error creating Board:', error);
//       throw error;
//   }
// };

// export default HandleCreateBoard;