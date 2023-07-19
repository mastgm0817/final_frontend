import React, { useState } from 'react';
import HandleCreatePost from './api/HandleCreatePost';

import './PostList.css';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';


const AddPostForm = ({refreshPosts, classname, toggleForm }) => {

  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [formUpDown, setclass] = useState(classname);
  

  const createPost = async () => {
    try {
      await HandleCreatePost(newPost, refreshPosts);
      console.log('Post created:', newPost);
      refreshPosts();
      setClassName();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleXButton=()=>{
    setClassName();
    refreshPosts();
    // setTimeout(1000);
    toggleForm();
  }

  const setClassName = () =>{
    if(formUpDown==='slideDown'){
        setclass("slideUp");
    }
    else {setclass("slideDown")
  }}
  


  return (
    <Grid container spacing={50}>
      <div id="post-form" className={formUpDown}>
        <h2 style={{ textAlign: 'center' }}>새로운 게시글 작성</h2>
        <div className="close-icon" onClick={handleXButton}>X</div>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'left' }}>
          <TextField
            id="outlined-basic"
            label="제목"
            variant="standard"
            type="text"
            value={newPost.title}
            onChange={e => setNewPost({ ...newPost, title: e.target.value })}
          />
        </div>


      <br />

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <FormControl fullWidth variant="standard">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'left' }}>
          <TextField
            id="outlined-basic"
            label="내용"
            variant="standard"
            type="text"
            value={newPost.content}
            onChange={e => setNewPost({ ...newPost, content: e.target.value })}
          />
        </div>
        </FormControl>
      </div>

      <br />

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button onClick={createPost}>게시글 작성 완료</Button>
      </div>
      </div>
    </Grid>
  );
};


export default AddPostForm;