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

import AddPostForm from './AddPostForm';
import UpdatePostForm from './UpdatePostForm';
import PostDetail from './PostDetail';
import FetchPosts from './api/FetchPosts';
import HandleDeletePost from './api/HandleDeletePost';
import HandleUpdatePost from './api/HandleUpdatePost';
import './PostList.css';


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  [`&.${tableRowClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableRowClasses.body}`]: {
    fontSize: 14,
  },
}));



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
      <header>
      <div>
        <h1 style={{ textAlign: 'center' }}>게시판</h1>
      </div>
      </header>

      <main style={{padding:'50px'}}>
      <div >
        <TableContainer  component={Paper} sx={{padding:'50px', width: '95%', align:'center'}}>
          <Table stickyHeader aria-label='customized table' sx={{borderCollapse:"true"}}>

            <TableHead sx={{ backgroundColor: 'primary.main' }}>
              <StyledTableRow>
                <TableCell>No</TableCell>
                <TableCell>제목</TableCell>
                <TableCell>작성일자</TableCell>
                <TableCell>추천수</TableCell>
                <TableCell>조회수</TableCell>
                <TableCell>      </TableCell>
              </StyledTableRow>
            </TableHead>

            <TableBody>
              {posts.map(post => (
                  <React.Fragment key={post.pid}>
                      <TableRow className='tablerow'
                        onClick={() => handlePostClick(post)}>
                          <TableCell>{post.pid}</TableCell>
                          <TableCell>{post.title}</TableCell>
                          <TableCell>{post.createdAt}</TableCell>
                          <TableCell>{post.recommendations}</TableCell>
                          <TableCell>{post.views}</TableCell>
                          <TableCell>
                            {/* 수정 */}
                              <EditIcon onClick={(event) => {event.stopPropagation(); handleUpdateForm(post); setShowUpdateForm(true);}}></EditIcon>
                            {/* 삭제 */}
                              <DeleteIcon onClick={(event) => {event.stopPropagation(); handleDeleteClick(post);}}/>
                          </TableCell>
                      </TableRow>
                      <TableRow>
                          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                              <Collapse in={selectedPost && selectedPost.pid === post.pid} 
                                        timeout="auto" unmountOnExit >
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
      </main>
      
      <footer sx={{ borderLeft: '20px' }}>
          <Fab variant="extended" onClick={toggleAddForm} sx={{ position: 'fixed', bottom: '5em', right: '5em' }}>
          <AddIcon sx={{ marginRight: '0.5em' }} />
          게시글 작성하기
          </Fab>
      {showAddForm && <AddPostForm toggleForm={toggleAddForm} refreshPosts={fetchData} />}
      </footer>
    </>
  );
}

export default PostList;