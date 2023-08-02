import Comment from '@/app/comment';
import axios from 'axios';


const HandleCreateComment = async (newComment:Comment, boardId:Number) => {

    try {
    
        const response = await axios.post(`http://localhost:8080/api/boards/${boardId}/comments`, newComment, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
        console.log('Comment created:', response.data);
    } catch (error) {
        console.error('Error creating Comment:', error);
        throw error;
    }
};

export default HandleCreateComment;
