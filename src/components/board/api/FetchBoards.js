import axios from 'axios';

const FetchBoards = async () => {
    try {
        const response = await axios.get('/api/boards');
        return response.data;
    } catch (error) {
        console.error('Error fetching boards:', error);
        throw error;
    }
};

export default FetchBoards;