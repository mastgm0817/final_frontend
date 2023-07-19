import React from 'react';
import './PostList.css';

import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

const PostDetail = ({ post }) => {

    // const [newComment, setcomment]
    return (
        <Box sx={{align:"center"}}>
            <div style={{marginLeft:"30"}}>
            <h2 style={{ wordBreak: 'break-all' }}>{post.title}</h2>
            {/* <p style={{ marginBottom: '1em' }}>{post.author}</p><br /> */}
            <table style={{ borderCollapse: 'collapse' }}>
                <tbody><tr className="detail-additional"><td style={{ width: '10%' }}>작성일&nbsp; {post.createdAt}</td><td>&nbsp;&nbsp;&nbsp;&nbsp;</td><td>최근 수정&nbsp; {post.updatedAt}</td></tr>
                <tr className="detail-additional"><td>조회수&nbsp; {post.views}</td><td>&nbsp;&nbsp;&nbsp;&nbsp;</td><td>추천수&nbsp; {post.recommendations}</td></tr>
                <tr></tr>
                <tr></tr>
                <tr><td><p style={{ marginBottom: '1em' }}>{post.content}</p></td></tr>
                {/* <tr><td><p style={{ wordBreak: 'break-all' }}>{post.comments}</p></td></tr> */}
                </tbody>
            </table>
            </div>

             <h4>댓글 목록</h4>
            {/*<div>{post.comments}</div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'left' }}>
                <TextField
                    id="outlined-basic"
                    label="내용"
                    variant="standard"
                    type="text"
                    value={post.comments}
                    onChange={e => setNewPost({ ...newPost, comments: e.target.value })}
                />
            </div> */}
        </Box>
    );
};  

export default PostDetail;
