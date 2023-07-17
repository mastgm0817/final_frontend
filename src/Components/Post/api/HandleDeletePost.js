import axios from 'axios';
import FetchPosts from './FetchPosts';

const HandleDeletePost = (postId) => {
    axios.delete(`/api/posts/${postId}`, {
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
    .then(response => {
        console.log('Post deleted:', response.data);
        FetchPosts(); // 게시글 목록 갱신
    })
    .catch(error => {
        console.error('Error deleting post:', error);
    });
};

export default HandleDeletePost;