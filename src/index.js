import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
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

serviceWorker.unregister();
