import React, { useState } from 'react';
import HandleUpdatePost from './../api/HandleUpdatePost';
import './../App.css';

const UpdatePostForm = ({ post, toggleForm, refreshPosts }) => {

  const [updatedPost, setUpdatedPost] = useState(post?{ 
    title: post.title, 
    content: post.content, 
    updatedAt: new Date().toISOString()
  } : null);

  const updatingPost = async () => {
    try {
      await HandleUpdatePost(post.pid, updatedPost, refreshPosts);
      console.log('Post updated:', updatedPost);
      toggleForm();
      refreshPosts();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  if (!updatedPost) {
    return null;
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
};

export default UpdatePostForm;
