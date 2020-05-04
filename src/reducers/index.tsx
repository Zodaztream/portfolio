// Contain all reducers in this file
import counterReducer from "./counter";
import { combineReducers } from "redux";
import editReducer from "./edit";
import gridReducer from "./gridElement";
import backgroundImageReducer from "./backgroundImage";

const allReducers = combineReducers({
  counter: counterReducer,
  edit: editReducer,
  elements: gridReducer,
  backgroundImage: backgroundImageReducer
});

export type RootState = ReturnType<typeof allReducers>;
export default allReducers;
