import React from 'react';
import './PostList.css';

import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

const PostDetail = ({ post }) => {
    return (
        <Box sx={{align:"center"}}>
            <div style={{marginLeft:"30"}}>
            <h2>{post.title}</h2>
            {/* <p style={{ marginBottom: '1em' }}>{post.author}</p><br /> */}
            <table style={{ borderCollapse: 'collapse' }}>
                <tbody><tr className="detail-additional"><td>작성일&nbsp; {post.createdAt}</td><td>&nbsp;&nbsp;&nbsp;&nbsp;</td><td>최근 수정&nbsp; {post.updatedAt}</td></tr>
                <tr className="detail-additional"><td>조회수&nbsp; {post.views}</td><td>&nbsp;&nbsp;&nbsp;&nbsp;</td><td>추천수&nbsp; {post.recommendations}</td></tr>
                <tr></tr>
                <tr></tr>
                <tr><td><p style={{ marginBottom: '1em' }}>{post.content}</p></td></tr>
                <tr><td><p>{post.comments}</p></td></tr>
                </tbody>
            </table>
            </div>
        </Box>
    );
};  

export default PostDetail;

