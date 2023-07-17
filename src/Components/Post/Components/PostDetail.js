import React from 'react';
import './../App.css';
import { Box, ThemeProvider, createTheme } from '@mui/system';

const PostDetail = ({ post }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <p>={post.title}</p>
            <p style={{ marginBottom: '1em' }}>{post.author}</p>
            <p style={{ marginBottom: '1em' }}>{post.createdAt}</p>
            <p style={{ marginBottom: '1em' }}>{post.updatedAt}</p>
            <p style={{ marginBottom: '1em' }}>{post.content}</p>
            <p style={{ marginBottom: '1em' }}>{post.comments}</p>
            <p style={{ marginBottom: '1em' }}>{post.views}</p>
            <p style={{ marginBottom: '1em' }}>{post.recommendations}</p>
        </div>
    );
};

export default PostDetail;
