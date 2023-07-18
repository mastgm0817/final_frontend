import React from 'react';
import './PostList.css';

import Divider from '@mui/material/Divider';
import {styled} from '@mui/system';
import Box from '@mui/material/Box';

const PostDetail = ({ post }) => {

    const StyledDivider = styled(Divider)({
        marginTop: '1em',
        // marginBottom: '1em'
        backgroundColor:'black',
      })



    return (
        <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'column', alignItems: 'center' }}>
            <h2>{post.title}</h2>
            {/* <p style={{ marginBottom: '1em' }}>{post.author}</p><br /> */}
            <table style={{ borderCollapse: 'collapse' }}>
                <tbody><tr className="detail-additional"><td>작성일</td><td>{post.createdAt}</td><td>&nbsp;&nbsp;</td><td>최근 수정</td><td>{post.updatedAt}</td></tr>
                <tr className="detail-additional"><td>조회수</td><td>{post.views}</td><td>&nbsp;&nbsp;</td><td>추천수</td><td>{post.recommendations}</td></tr>
                </tbody>
            </table>
            <StyledDivider />

            <p style={{ marginBottom: '1em' }}>{post.content}</p>
            <p style={{ marginBottom: '1em' }}>{post.comments}</p>
        </Box>
    );
};  

export default PostDetail;

