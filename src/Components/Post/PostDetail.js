import React from 'react';
import './PostList.css';

import Divider from '@mui/material/Divider';
import {styled} from '@mui/system';

const PostDetail = ({ post }) => {

    const StyledDivider = styled(Divider)({
        marginTop: '1em',
        // marginBottom: '1em'
        backgroundColor:'black',
      })

      

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'column', alignItems: 'center' }}>
            <h2 style={{ textAlign: 'left' }}>{post.title}</h2>
            {/* <p style={{ marginBottom: '1em' }}>{post.author}</p><br /> */}
            <table border-collapse='true'>
            <tr class="detail-additional">작성일 {post.createdAt} &nbsp;&nbsp; 최근 수정 {post.updatedAt}</tr>
            <tr class="detail-additional">조회수 {post.views} &nbsp;&nbsp; 추천수 {post.recommendations}</tr>
            </table>
            <StyledDivider />

            <p style={{ marginBottom: '1em' }}>{post.content}</p>
            <p style={{ marginBottom: '1em' }}>{post.comments}</p>

        </div>
    );
};  

export default PostDetail;

