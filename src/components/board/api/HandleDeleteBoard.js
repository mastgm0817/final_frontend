import axios from 'axios';

const HandleDeleteBoard = async (BoardId) => {
    try {
        const response = await axios.delete(`/api/boards/${BoardId}`, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
        console.log('Board deleted:', response.data);
    } catch (error) {
        console.error('Error deleting Board:', error);
        throw error;
    }
};


export default HandleDeleteBoard;  

