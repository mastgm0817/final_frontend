import axios from "axios";


const FetchComments = async (boardId:Number) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/boards/${boardId}/comments`);
        return response.data;
    } catch (error) {
        console.error('Error fetching Comment:', error);
        throw error;
    }
};

export default FetchComments;