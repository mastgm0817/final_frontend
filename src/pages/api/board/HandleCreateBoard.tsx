import axios from 'axios';
import Board from '../../../types/board';
import { SessionProvider } from "next-auth/react"

const HandleCreateBoard = async (newBoard:Board) => {

    newBoard.b_createdAt=new Date().toLocaleDateString();
    newBoard.b_updatedAt=new Date().toLocaleDateString();
    newBoard.b_recommendations=0;
    newBoard.b_views=0;
    newBoard.bid=0;
    try {
        const response = await axios.post('https://localhost:8080/api/boards', newBoard, {
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