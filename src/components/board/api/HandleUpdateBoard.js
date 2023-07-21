import axios from 'axios';

const HandleUpdateBoard = async (BoardId, updatedBoard, refreshBoards) => {
    try {
        const response = await axios.put(`/api/boards/${BoardId}`, updatedBoard, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
        console.log('Board updated:', response.data);
        refreshBoards();
    } catch (error) {
        console.error('Error updating Board:', error);
        throw error;
    }
};  


export default HandleUpdateBoard;