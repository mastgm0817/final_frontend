import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import PostList from './Components/Post/PostList';

ReactDOM.render(
  <Router>
    <Routes>
      {/* <Route exact path="/" element={<App />} /> */}
      <Route path="/" element={<PostList />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
