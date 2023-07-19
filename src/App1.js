import React from "react";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, applyMiddleware } from "redux";
import rootReducer from './store/rootReducer';
import './App.css';
import Calendar from "./components/calendar/Calendar";
import TodoList from "./components/todolist/TodoList";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware()));

function App1() {
  return (
          <Provider store={store}>
            <Calendar></Calendar>
            <TodoList></TodoList>
          </Provider>
  );
}

export default App1;