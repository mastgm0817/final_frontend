import axios from 'axios';

const HandleUpdateBoard = async (BoardId, updatedBoard, refreshBoards) => {
    try {
        const response = await axios.put(`/api/boards/${BoardId}`, updatedBoard, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
        refreshBoards();
        console.log('Board updated:', response.data);
    } catch (error) {
        console.error('Error updating Board:', error);
        throw error;
    }
};  


export default HandleUpdateBoard;