import React, { useState } from 'react';
import HandleUpdatePost from './../api/HandleUpdatePost';
import './../App.css';

const UpdatePostForm = ({ post, toggleForm }) => {

  const [updatedPost, setUpdatedPost] = useState({ title: post.title, content: post.content, updatedAt: new Date().toISOString()});

  const updatingPost = async () => {
    try {
      await HandleUpdatePost(post.pid, updatedPost);
      console.log('Post updated:', updatedPost);
      toggleForm();
    } catch (error) {
      console.error('Error updating post:', error);
    }
    

  return (
    <div id="post-form" className='form-open'>
      <h2 style={{ textAlign: 'center' }}>게시글 수정</h2>
      <div className="close-icon" onClick={toggleForm} >X</div>
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <input
          type="text"
          value={updatedPost.title}
          onChange={e => setUpdatedPost({ ...updatedPost, title: e.target.value })}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <textarea
          value={updatedPost.content}
          onChange={e => setUpdatedPost({ ...updatedPost, content: e.target.value })}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <button onClick={updatingPost}>게시글 수정</button>
      </div>
    </div>
  );
};}

export default UpdatePostForm;
