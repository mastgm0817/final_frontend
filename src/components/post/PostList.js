import React, { useState, useEffect } from 'react';

import { styled } from '@mui/material/styles';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow, tableRowClasses,
  TableCell,
  Paper
} from '@mui/material'
import Collapse from '@mui/material/Collapse';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import AddPostForm from './AddPostForm';
import UpdatePostForm from './UpdatePostForm';
import PostDetail from './PostDetail';
import FetchPosts from './api/FetchPosts';
import HandleDeletePost from './api/HandleDeletePost';
import HandleUpdatePost from './api/HandleUpdatePost';
import HandleView from './api/HandleView';
import './PostList.css';




const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [extendedPost, setExtendedPost] = useState(null);
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

  const handlePostClick = (post) => {
    setSelectedPost(post)
    setExtendedPost(!extendedPost);
    // HandleView(post);
  };


  const handleCollapseToggle = () => {
    setSelectedPost(!selectedPost);
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
    setShowUpdateForm(!showUpdateForm);
  };


  return (
    <>
      <div>
        <h1 style={{ textAlign: 'center' }}>게시판</h1>
      </div>

      <Box>
        <TableContainer   sx={{padding:'50px', width: '70%', align:'center'}}>
          <Table sx={{align:'center'}}>

            <TableHead sx={{ backgroundColor: '#1976D2' }}>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>No</TableCell>
                <TableCell style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>제목</TableCell>
                <TableCell style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>작성일자</TableCell>
                <TableCell style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>추천수</TableCell>
                <TableCell style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>조회수</TableCell>
                <TableCell style={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>      </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {posts.map(post => (

                <React.Fragment key={post.pid}>
                      <TableRow onClick={() => handlePostClick(post)} className='tablerow' key={post.pid}>
                          <TableCell style={{ width: '10%', textAlign:"center"}}>{post.pid}</TableCell>
                          <TableCell style={{ width: '20%', textAlign:"center" }}>{post.title}</TableCell>
                          <TableCell style={{ width: '15%', textAlign:"center" }}>{post.createdAt}</TableCell>
                          <TableCell style={{ width: '15%', textAlign:"center" }}>{post.recommendations}</TableCell>
                          <TableCell style={{ width: '15%', textAlign:"center" }}>{post.views}</TableCell>
                          <TableCell>
                            {/* 수정 */}
                              <EditIcon onClick={(event) => {event.stopPropagation(); handleUpdateForm(post); setShowUpdateForm(true);}}></EditIcon>
                            {/* 삭제 */}
                              <DeleteIcon onClick={(event) => {event.stopPropagation(); handleDeleteClick(post);}}/>
                          </TableCell>
                      </TableRow>

                      <TableRow>
                        <td></td>
                          <td><Collapse in={selectedPost && selectedPost.pid === post.pid} timeout="auto" unmountOnExit onClick={handlePostClick}>
                            <PostDetail post={selectedPost} />
                          </Collapse></td>
                      </TableRow>
                      </React.Fragment>
              ))}
          </TableBody>
          </Table>
        </TableContainer>
        {/* {showUpdateForm && <UpdatePostForm post={selectUpdate} toggleForm={toggleUpdateForm} refreshPosts={fetchData}/>} */}
        {showUpdateForm && <UpdatePostForm post={selectUpdate} toggleForm={toggleUpdateForm} refreshPosts={fetchData} classname={'slideUp'}/>}
      </Box>
      
        <Fab variant="extended" onClick={toggleAddForm} sx={{ position: 'fixed', bottom: '5em', right: '5em' }}>
          <AddIcon sx={{ marginRight: '0.5em' }} />
          게시글 작성하기
        </Fab>
        {showAddForm && <AddPostForm refreshPosts={fetchData} classname={'slideUp'} toggleForm={toggleAddForm} />}
    </>
  );
}

export default PostList;