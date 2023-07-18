import { createAction, handleActions } from "redux-actions";

// action types
const TODOS = "todolist/TODOS";
const CREATE_TODO = "todolist/CREATE_TODO";
const REMOVE_TODO = "todolist/REMOVE_TODO";
const TOGGLE_TODO = "todolist/TOGGLE_TODO";
const DAY_DOTOLIST = "todolist/DAY_TODOS";
const TODOS_IN_MONTH = "todolist/TODOS_IN_MONTH";
const SET_SHARED = "todolist/SET_SHARED";
const SET_USER_ID = "todolist/SET_USER_ID";
const SET_LOVER_ID = "todolist/SET_LOVER_ID";
const CLEAR_TODOS = "todolist/CLEAR_TODOS";
// action creators
export const todos = createAction(TODOS);
export const createTodo = createAction(CREATE_TODO);
export const removeTodo = createAction(REMOVE_TODO);
export const toggleTodo = createAction(TOGGLE_TODO);
export const dayTodolist = createAction(DAY_DOTOLIST);
export const todosInMonth = createAction(TODOS_IN_MONTH);
export const setShared = createAction(SET_SHARED);
export const setUserId = createAction(SET_USER_ID);
export const setLoverId = createAction(SET_LOVER_ID);
export const clearTodos = createAction(CLEAR_TODOS);
// initial state
const initialState = {
  todos: [
    {
      id: 1,
      year: 2020,
      month: 1,
      day: 2,
      text: "리액트공부하기2020년",
      done: false,
    },
  ],
  filteredTodos: [{}],
  id: 2,
  dayTodos: [
    { start: 0 },
    { to: 0, do: 0 },
    // ...
  ],
  shared: false, // 공유 여부
  userId: "SW", // 사용자 ID,
  loverId: ""
};

// reducer
export default handleActions(
  {
    [TODOS]: (state, action) => {
      return {
        ...state,
        filteredTodos: state.todos.filter((todo) => {
          return (
            todo.day === action.payload.currentDay &&
            todo.month === action.payload.currentMonth &&
            todo.year === action.payload.currentYear
          );
        }),
      };
    },
    [CREATE_TODO]: (state, action) => {
      return {
        ...state,
        todos: state.todos.concat(action.payload.todo),
        id: state.id + 1,
      };
    },
    [TOGGLE_TODO]: (state, action) => {
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? { ...todo, done: !todo.done } : todo
        ),
      };
    },
    [REMOVE_TODO]: (state, action) => {
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    },
    [DAY_DOTOLIST]: (state, action) => {
      const inner = [
        { start: 0 },
        { to: 0, do: 0 },
        { to: 0, do: 0 },
        { to: 0, do: 0 },
        { to: 0, do: 0 },
        { to: 0, do: 0 },
        { to: 0, do: 0 },
        { to: 0, do: 0 },
        { to: 0, do: 0 },
        { to: 0, do: 0 },
        { to: 0, do: 0 },
        { to: 0, do: 0 },
        { to: 0, do: 0 },
        { to: 0, do: 0 },
        { to: 0, do: 0 },
        { to: 0, do: 0 },
        { to: 0, do: 0 },
        { to: 0, do: 0 },
        { to: 0, do: 0 },
        { to: 0, do: 0 },
        { to: 0, do: 0 },
        { to: 0, do: 0 },
        { to: 0, do: 0 },
        { to: 0, do: 0 },
        { to: 0, do: 0 },
        { to: 0, do: 0 },
        { to: 0, do: 0 },
        { to: 0, do: 0 },
        { to: 0, do: 0 },
        { to: 0, do: 0 },
        { to: 0, do: 0 },
        { to: 0, do: 0 },
      ];
      return {
        ...state,
        dayTodos: inner,
      };
    },
    [SET_SHARED]: (state, action) => {
      return {
        ...state,
        shared: action.payload.shared,
      };
    },
    
    [SET_LOVER_ID]: (state, action) => {
      return {
        ...state,
        loverId: action.payload.loverId,
      };
    },
    [SET_USER_ID]: (state, action) => {
      return {
        ...state,
        userId: action.payload.userId,
      };
    },
    [CLEAR_TODOS]: (state, action) => {
      return{
        ...state,
        todos:[],
      };
    },
  },
  initialState
);
