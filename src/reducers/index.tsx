// Contain all reducers in this file
import counterReducer from "./counter";
import { combineReducers } from "redux";
import editReducer from "./edit";

const allReducers = combineReducers({
  counter: counterReducer,
  edit: editReducer
});

export default allReducers;
