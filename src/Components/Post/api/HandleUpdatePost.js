import axios from 'axios';
import FetchPosts from './FetchPosts';


const HandleUpdatePost = (postId, updatedPost) => {
    axios.put(`/api/posts/${postId}`, updatedPost, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
    .then(response => {
        console.log('Post updated:', response.data);
        FetchPosts(); // 게시글 목록 갱신
    })
    .catch(error => {
        console.error('Error updating post:', error);
    });
};

export default HandleUpdatePost;