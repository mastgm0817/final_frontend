import axios from 'axios';

const HandleUpdatePost = async (postId, updatedPost, refreshPosts) => {
    try {
        const response = await axios.put(`http://180.150.207.73:8080/api/posts/${postId}`, updatedPost, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
        console.log('Post updated:', response.data);
        refreshPosts();
    } catch (error) {
        console.error('Error updating post:', error);
        throw error;
    }
};  


export default HandleUpdatePost;