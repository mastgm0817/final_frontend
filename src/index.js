import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import PostList from './Components/Post/PostList';
import UserList from './Components/User/UserList';

ReactDOM.render(
  <Router>
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route path="/posts" element={<PostList />} />
      <Route path="/users" element={<UserList />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
