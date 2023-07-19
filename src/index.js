import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import App1 from "./App1";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';

import PostList from './components/post/PostList';
import UserList from './components/user/UserList';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/posts" element={<PostList />} />
      <Route path="/users" element={<UserList />} />
      <Route path="/calenders" element={<App1 />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);

serviceWorker.unregister();
