import { Reducer } from "redux";

interface editTypes {
  type: string;
}

// default state is 0, next time this is called, the state is called from data storage instead.
const editReducer = (state: boolean = false, action: editTypes) => {
  switch (action.type) {
    case "TOGGLE_EDIT":
      return !state;
    default:
      return state;
  }
};

export default editReducer;
