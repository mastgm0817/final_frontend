import React, { useState } from 'react';
import HandleUpdatePost from './api/HandleUpdatePost';
import './PostList.css';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const UpdatePostForm = ({ post, toggleForm, refreshPosts, classname }) => {

  const [updatedPost, setUpdatedPost] = useState(post?{ 
    title: post.title, 
    content: post.content, 
    updatedAt: new Date().toISOString()
  } : null);

  const [formUpDown, setclass] = useState(classname);
  const [isclosed, setcloseed] = useState(false)

  const setClassName = () =>{
    if(formUpDown==='slideDown'){
      setclass("slideUp");
    }
    else {setclass("slideDown")
  }}
  

  const updatingPost = async () => {
    try {
      await HandleUpdatePost(post.pid, updatedPost, refreshPosts);
      console.log('Post updated:', updatedPost);
      refreshPosts();
      setClassName();
      setcloseed(true);
      toggleForm();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };


  

  if (!updatedPost) {
    return null;
  }

  const handleXButton=()=>{
    setclass("slideDown");
    setUpdatedPost(null);
    refreshPosts();
    toggleForm();
  }

  return (
    <div id="post-form" className={formUpDown}>
      <h2 style={{ textAlign: 'center' }}>게시글 수정</h2>
      <div className="close-icon" onClick={handleXButton} >X</div>
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <TextField id="outlined-basic" label="제목" variant="standard"
          type="text"
          value={updatedPost.title}
          onChange={e => setUpdatedPost({ ...updatedPost, title: e.target.value })}
        />
      </div>

      <br />

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <TextField id="outlined-basic" label="제목" variant="standard"
          value={updatedPost.content}
          onChange={e => setUpdatedPost({ ...updatedPost, content: e.target.value })}
        />
      </div>

      <br />

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button onClick={updatingPost}>게시글 수정</Button>
      </div>
    </div>
  );
};

export default UpdatePostForm;
