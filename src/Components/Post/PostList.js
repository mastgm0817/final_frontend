import React, { useState, useEffect } from 'react';

import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper
} from '@mui/material'
import Collapse from '@mui/material/Collapse';

import AddPostForm from './AddPostForm';
import UpdatePostForm from './UpdatePostForm';
import PostDetail from './PostDetail';
import FetchPosts from './api/FetchPosts';
import HandleDeletePost from './api/HandleDeletePost';
import HandleUpdatePost from './api/HandleUpdatePost';
import './App.css';


const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectUpdate, setUpdatePost] = useState(null);

  const fetchData = async () => {
    try {
      const response = await FetchPosts();
      setPosts(response);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [window.location.pathname]);


  

  const handlePostClick = (post) => {
    if (selectedPost && selectedPost.pid === post.pid) {
      setSelectedPost(null);
    } else {
      setSelectedPost(post);
    }
  };
  

  const handleUpdateForm = (post) => {
    setUpdatePost(post);
  };


  const handleDeleteClick = async (post) => {
    try {
      await HandleDeletePost(post.pid);
      const updatedPosts = posts.filter(p => p.pid !== post.pid);
      setPosts(updatedPosts);
      console.log('Post deleted:', post);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const toggleUpdateForm = () => {
    // setShowUpdateForm(!showUpdateForm);
    setShowUpdateForm(prevState => !prevState);
  };


  return (
    <>
      <div>
        <h1 style={{ textAlign: 'center' }}>게시판</h1>
      </div>

      <div>
        <TableContainer sx={{ maxHeight: '400px' }} component={Paper}>
          <Table stickyHeader aria-label='simple table'>

            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>제목</TableCell>
                <TableCell>작성일자</TableCell>
                <TableCell>추천수</TableCell>
                <TableCell>조회수</TableCell>
                <TableCell>      </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {posts.map(post => (
                  <React.Fragment key={post.pid}>
                      <TableRow onClick={() => handlePostClick(post)}>
                          <TableCell>{post.pid}</TableCell>
                          <TableCell>{post.title}</TableCell>
                          <TableCell>{post.createdAt}</TableCell>
                          <TableCell>{post.recommendations}</TableCell>
                          <TableCell>{post.views}</TableCell>
                          <TableCell>
                              <button onClick={(event) => {event.stopPropagation(); handleUpdateForm(post); setShowUpdateForm(true);}}>수정</button>
                              <button onClick={(event) => {event.stopPropagation(); handleDeleteClick(post);}}>삭제</button>
                          </TableCell>
                      </TableRow>
                      <TableRow>  
                          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                              <Collapse in={selectedPost && selectedPost.pid === post.pid} timeout="auto" unmountOnExit>
                                  <PostDetail post={selectedPost} />
                              </Collapse>
                          </TableCell>
                      </TableRow>
                  </React.Fragment>
              ))}
          </TableBody>
          {showUpdateForm && selectUpdate && <UpdatePostForm post={selectUpdate} toggleForm={toggleUpdateForm} refreshPosts={fetchData}/>}
          </Table>
        </TableContainer>
      </div>
      

      <button onClick={toggleAddForm}>게시글 작성하기</button>
      {showAddForm && <AddPostForm toggleForm={toggleAddForm} refreshPosts={fetchData} />}
    </>
  );
}

export default PostList;