import axios from 'axios';

const HandleCreateBoard = async (newBoard, refreshBoards) => {
  try {
      const response = await axios.post('/api/boards', newBoard, {
          headers: {
              'Content-Type': 'application/json; charset=utf-8'
          }
      });
      console.log('Board created:', response.data);
      refreshBoards();
  } catch (error) {
      console.error('Error creating Board:', error);
      throw error;
  }
};

export default HandleCreateBoard;