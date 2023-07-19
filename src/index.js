import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
<<<<<<< HEAD
import PostList from './components/Post/PostList';
import UserList from './components/User/UserList';
=======
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
>>>>>>> 9e43bbf82e9a0c4cbf11ffd9e2b6b48b920a94ea

ReactDOM.render(
    <BrowserRouter>
      <App />,
    </BrowserRouter>,
  document.getElementById('root')
);
