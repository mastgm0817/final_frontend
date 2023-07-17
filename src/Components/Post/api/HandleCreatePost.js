import axios from 'axios';
import FetchPosts from './FetchPosts';
// import AddPostForm from '../components/AddPostForm';

const HandleCreatePost = (newPost, callback) => {

    axios
      .post('/api/posts', newPost, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      .then(response => {
        console.log('Post created:', response.data);
        FetchPosts();
        callback();
      })
      .catch(error => {
        console.error('Error creating post:', error);
      });
  };

export default HandleCreatePost;