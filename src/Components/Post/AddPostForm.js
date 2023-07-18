import React, { useState } from 'react';
import HandleCreatePost from './api/HandleCreatePost';
import './App.css';
import TablePagination from '@mui/material/TablePagination';

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
    <div id="post-form" className='form-open'>
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
        <button onClick={createPost}>게시글 작성</button>
      </div>
    </div>
  );
};

export default AddPostForm;