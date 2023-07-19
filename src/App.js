import React from "react";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import rootReducer from './store/rootReducer';
import './App.css';
import { useNavigate } from 'react-router-dom';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware()));




function App() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  }

  const goToCalender = () => {
    navigate('/calenders');
  }
  const goToPost = () => {
    navigate('/posts');
  }
  const goToUser = () => {
    navigate('/users');
  }
    
  return (
    <div className="App">
      <header className="App-header">

      <button onClick={goToHome}>Go Home </button>
      <button onClick={goToPost}>Go to Post page</button>
      <button onClick={goToUser}>Go to User page</button>
      <button onClick={goToCalender}>Go to Calender</button>

      </header>
    </div>
  );
}

export default App;
