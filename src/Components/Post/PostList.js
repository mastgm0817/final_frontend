import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostList = () => {
  const [posts, setPosts] = useState("");
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  // 게시글 목록 불러오기
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8080/api/posts');
      const info = response.data.map((posts) => {
        return {
          id : posts.id,
          title: posts.title,
          content: posts.content,
        };
      });
      setPosts(info);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  
  
  

  // 새로운 게시글 생성
  const createPost = async () => {
    try {
      const response = await axios.post('/api/posts', newPost);
      setPosts([...posts, response.data]);
      setNewPost({ title: '', content: '' });
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  // 게시글 삭제
  const deletePost = async (postId) => {
    try {
      await axios.delete(`/api/posts/${postId}`);
      setPosts(posts.filter((post) => post.pid !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      <h1>Post List</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Content"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
        />
        <button onClick={createPost}>Create</button>
      </div>
      <ul>
        {posts.post.map((post) => (
          <li key={post.pid}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <button onClick={() => deletePost(post.pid)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
