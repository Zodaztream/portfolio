import { Reducer } from "redux";

interface Element {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface ElementState {
  elements: Element[];
}

interface ActionType {
  type: string;
  payload: Element;
}

//export interfaces instead of copying it to all (separate types file, probably index.types or something for easier import): https://redux.js.org/recipes/usage-with-typescript

const initialUserState: ElementState = {
  elements: []
};

// default state is 0, next time this is called, the state is called from data storage instead.
const gridReducer = (
  state: ElementState = initialUserState,
  action: ActionType
) => {
  switch (action.type) {
    case "ADD_ELEMENT":
      return {
        elements: [...state.elements, action.payload]
      };
    case "REMOVE_ELEMENT":
      return state;
    default:
      return state;
  }
};

export default gridReducer;
