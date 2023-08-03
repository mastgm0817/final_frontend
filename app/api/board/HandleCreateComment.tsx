import Board from '@/types/board';
import Comment from '@/types/comment';
import axios from 'axios';
import { SessionProvider } from "next-auth/react"


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
