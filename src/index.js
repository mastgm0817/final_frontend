import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
      <App />,
    </BrowserRouter>,
  document.getElementById('root')
);
