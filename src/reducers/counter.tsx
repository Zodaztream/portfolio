import { Reducer } from "redux";

interface countTypes {
  type: string;
}

// default state is 0, next time this is called, the state is called from data storage instead.
const counterReducer: Reducer = (state: number = 0, action: countTypes) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    default:
      return state;
  }
};

export default counterReducer;
