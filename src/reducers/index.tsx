// Contain all reducers in this file
import counterReducer from "./counter";
import { combineReducers } from "redux";
import editReducer from "./edit";
import gridReducer from "./gridElement";
import backgroundImageReducer from "./backgroundImage";
import toggleAccountMenuReducer from "./toggleAccountMenu";

const allReducers = combineReducers({
  counter: counterReducer,
  edit: editReducer,
  elements: gridReducer,
  backgroundImage: backgroundImageReducer,
  toggleAccountMenu: toggleAccountMenuReducer
});

export type RootState = ReturnType<typeof allReducers>;
export default allReducers;
