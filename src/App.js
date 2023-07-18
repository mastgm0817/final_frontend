import React from "react";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import rootReducer from './store/rootReducer';
import Calendar from "./components/calendar/Calendar";
import TodoList from "./components/TodoList/TodoList";
import './App.css';
import { Link } from 'react-router-dom';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware()));

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Provider store={store}>
            <Calendar></Calendar>
            <TodoList></TodoList>
          </Provider>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/posts">게시판</Link>
        </li>
        <li>
          <Link to="/users">사용자</Link>
        </li>
      </ul>
      </header>
    </div>
  );
}

export default App;
