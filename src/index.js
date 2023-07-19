
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './components/post/PostList';
import UserList from './components/user/UserList';

ReactDOM.render(
    <BrowserRouter>
      <App />,
    </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
