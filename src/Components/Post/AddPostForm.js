import React, { useState } from 'react';
import HandleCreatePost from './api/HandleCreatePost';
import './PostList.css';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const AddPostForm = ({ toggleForm, refreshPosts }) => {
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  const createPost = async () => {
    try {
      await HandleCreatePost(newPost, toggleForm, refreshPosts);
      console.log('Post created:', newPost);
      toggleForm();
      refreshPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <Box id="post-form" className={toggleForm ? 'active' : ''}>
      <h2 style={{ textAlign: 'center' }}>새로운 게시글 작성</h2>
      <div className="close-icon" onClick={toggleForm} >X</div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="제목"
          value={newPost.title}
          onChange={e => setNewPost({ ...newPost, title: e.target.value })}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <textarea
          placeholder="내용"
          value={newPost.content}
          onChange={e => setNewPost({ ...newPost, content: e.target.value })}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button onClick={createPost}>게시글 작성 완료</Button>
      </div>
    </Box>
  );
};


export default AddPostForm;

