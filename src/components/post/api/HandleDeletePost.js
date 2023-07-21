import axios from 'axios';

const HandleDeletePost = async (postId) => {
    try {
        const response = await axios.delete(`http://localhost:8080/api/posts/${postId}`, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
        console.log('Post deleted:', response.data);
    } catch (error) {
        console.error('Error deleting post:', error);
        throw error;
    }
};


export default HandleDeletePost;  

