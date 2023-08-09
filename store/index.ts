import { createStore, combineReducers } from 'redux';
import { positionReducer } from './position';

// Combine all reducers if you have multiple
const rootReducer = combineReducers({
  position: positionReducer,
  // Add other reducers here if applicable
});

// Create the Redux store
export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
