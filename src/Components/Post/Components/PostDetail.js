import React from 'react';
import './../App.css';

const PostDetail = ({ post }) => {
    return (
        <div>
            <p>{post.title}</p>
            <p>{post.author}</p>
            <p>{post.createdAt}</p>
            <p>{post.updatedAt}</p>
            <p>{post.content}</p>
            <p>{post.comments}</p>
            <p>{post.views}</p>
            <p>{post.recommendations}</p>
        </div>
    );
};

export default PostDetail;
