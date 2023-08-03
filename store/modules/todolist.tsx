//types
const TODOS = "todolist/TODOS";
const CREATE_TODO = "todolist/CREATE_TODO";
const REMOVE_TODO = "todolist/REMOVE_TODO";
const TOGGLE_TODO = "todolist/TOGGLE_TODO";
const DAY_TODOLIST = "todolist/DAY_TODOS";

interface Todos {
  type: typeof TODOS;
  payload: {
    currentDay: number;
    currentMonth: number;
    currentYear: number;
  };
}

interface CreateTodo {
  type: typeof CREATE_TODO;
  payload: {
    todo: TodosData;
  };
}

interface RemoveTodo {
  type: typeof REMOVE_TODO;
  payload: {
    id: number;
  };
}

interface ToggleTodo {
  type: typeof TOGGLE_TODO;
  payload: {
    id: number;
  };
}

interface DayTodoList {
  type: typeof DAY_TODOLIST;
  payload: {
    currentMonth: number;
    currentYear: number;
  };
}
export type TodolistActionType =
  | Todos
  | CreateTodo
  | RemoveTodo
  | ToggleTodo
  | DayTodoList;

//action craetor
function Todos(currentDay: number, currentMonth: number, currentYear: number) {
  return {
    type: TODOS,
    payload: {
      currentDay: currentDay,
      currentMonth: currentMonth,
      currentYear: currentYear
    }
  };
}

function CreateTodo(todo: TodosData) {
  return {
    type: CREATE_TODO,
    payload: {
      todo: todo
    }
  };
}

function RemoveTodo(id: number) {
  return {
    type: REMOVE_TODO,
    payload: {
      id: id
    }
  };
}

function ToggleTodo(id: number) {
  return {
    type: TOGGLE_TODO,
    payload: {
      id: id
    }
  };
}

function DayTodoList(currentMonth: number, currentYear: number) {
  return {
    type: DAY_TODOLIST,
    payload: {
      currentMonth: currentMonth,
      currentYear: currentYear
    }
  };
}

export const actionCreator = {
  Todos,
  CreateTodo,
  RemoveTodo,
  ToggleTodo,
  DayTodoList
};
//initial state

export interface TodosData {
  id: number;
  year: number;
  month: number;
  day: number;
  text: string;
  done: boolean;
}
interface DaytodosData {
  to: number;
  do: number;
}
export interface TodoListState {
  todos: TodosData[];
  filteredTodos: TodosData[];
  id: number;
  dayTodos: DaytodosData[];
}

const initialState: TodoListState = {
  todos: [
    {
      id: 1,
      year: 2020,
      month: 1,
      day: 25,
      text: "리액트공부하기2020년",
      done: false
    }
  ],
  filteredTodos: [],
  id: 2,
  dayTodos: [
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
    { to: 0, do: 0 }
  ]
};

//reducer
export function todolistReducer(
  state = initialState,
  action: TodolistActionType
): TodoListState {
  switch (action.type) {
    case TODOS:
      return {
        ...state,
        filteredTodos: state.todos.filter(todo => {
          return (
            todo.day === action.payload.currentDay &&
            todo.month === action.payload.currentMonth &&
            todo.year === action.payload.currentYear
          );
        })
      };
    case CREATE_TODO:
      return {
        ...state,
        todos: state.todos.concat(action.payload.todo),
        id: state.id + 1
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? { ...todo, done: !todo.done } : todo
        )
      };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload.id)
      };
    case DAY_TODOLIST: {
      const monthlyTodos = state.todos.filter(todo => {
        return (
          todo.month === action.payload.currentMonth + 1 &&
          todo.year === action.payload.currentYear
        );
      });
      const inner = [
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
        { to: 0, do: 0 }
      ];
      monthlyTodos.map(todo => {
        if (todo.done === true) {
          inner[todo.day].do = inner[todo.day].do + 1;
        } else {
          inner[todo.day].to = inner[todo.day].to + 1;
        }
      });
      return {
        ...state,
        dayTodos: inner
      };
    }
    default:
      return state;
  }
}
