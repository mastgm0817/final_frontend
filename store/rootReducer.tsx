import { combineReducers } from "redux";
import { DateState, dateReducer as date } from "./modules/date";
import { TodoListState, todolistReducer as todolist } from "./modules/todolist";

export interface StoreState {
  date: DateState;
  todolist: TodoListState;
}

const rootReducer = combineReducers<StoreState>({
  date,
  todolist
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
