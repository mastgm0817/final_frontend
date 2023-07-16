import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PostList()  {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const deletePost = async (pid) => {
    try {
      await axios.delete(`/api/posts/${pid}`);
      fetchPosts(); // Refresh the post list after deletion
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const createPost = async (event) => {
    event.preventDefault(); // 페이지 리로드 방지
  
    try {
      const response = await axios.post('/api/posts', newPost);
      setNewPost({ title: '', content: '' }); // 폼 필드 초기화
      fetchPosts(); // 생성 후 게시물 목록 새로고침
    } catch (error) {
      console.error('게시물 생성 오류:', error);
    }
  };
  

  return (
    <div>
      <h1>Post List</h1>

      {/* Create Post Form */}
      <form onSubmit={createPost}>
        <input
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
        />
        <button type="submit">Create Post</button>
      </form>

      {/* Existing Posts */}
      {posts.map((post) => (
        <div key={post.pid}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <button onClick={() => deletePost(post.pid)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default PostList;
