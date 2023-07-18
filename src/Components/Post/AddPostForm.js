import React, { useState } from 'react';
import HandleCreatePost from './api/HandleCreatePost';
import './PostList.css';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';

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
    <Box sx={{ border: 'none' }}>
      <div id="post-form" className={toggleForm ? 'active' : ''}>
      <h2 style={{ textAlign: 'center' }}>새로운 게시글 작성</h2>
      <div className="close-icon" onClick={toggleForm} >X</div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'left' }}>
        <TextField id="outlined-basic" label="제목" variant="standard"
          type="text"
          value={newPost.title}
          onChange={e => setNewPost({ ...newPost, title: e.target.value })}
        />
      </div>

      <br />

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <FormControl fullWidth variant="standard">
        
        </FormControl>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button onClick={createPost}>게시글 작성 완료</Button>
      </div>
      </div>
    </Box>
  );
};


export default AddPostForm;

