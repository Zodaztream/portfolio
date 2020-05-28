import { combineReducers } from "redux";
import editReducer from "./edit";
import gridReducer from "./gridElement";
import backgroundImageReducer from "./backgroundImage";
import toggleAccountMenuReducer from "./toggleAccountMenu";
import searchReducer from "./search";
import messageReducer from "./message";

/**
 * @description This combines all of the reducers, which
 * is the beneficial for retrieving states
 */
const allReducers = combineReducers({
  edit: editReducer,
  elements: gridReducer,
  backgroundImage: backgroundImageReducer,
  toggleAccountMenu: toggleAccountMenuReducer,
  isSearching: searchReducer,
  globalMessage: messageReducer
});

// RootState allows the Typescript to deduce the type when fetching a state
export type RootState = ReturnType<typeof allReducers>;
export default allReducers;
