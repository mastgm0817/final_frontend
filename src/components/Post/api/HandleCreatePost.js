import axios from 'axios';

const HandleCreatePost = async (newPost, refreshPosts) => {
  try {
      const response = await axios.post('http://180.150.207.73:8082/api/posts', newPost, {
          headers: {
              'Content-Type': 'application/json; charset=utf-8'
          }
      });
      console.log('Post created:', response.data);
      refreshPosts();
  } catch (error) {
      console.error('Error creating post:', error);
      throw error;
  }
};

export default HandleCreatePost;
