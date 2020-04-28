import { Reducer } from "redux";
import { Element } from "../components/types";
import { access } from "fs";
import update from "immutability-helper";
import { element } from "prop-types";

interface ElementState {
  elements: {
    [key: string]: Element;
  };
}

interface ActionType {
  type: string;
  payload: Element;
}

//export interfaces instead of copying it to all (separate types file, probably index.types or something for easier import): https://redux.js.org/recipes/usage-with-typescript

const initialUserState: ElementState = {
  elements: {}
};

// default state is 0, next time this is called, the state is called from data storage instead.
const gridReducer = (
  state: ElementState = initialUserState,
  action: ActionType
) => {
  switch (action.type) {
    case "ADD_ELEMENT":
      return {
        elements: { ...state.elements, [action.payload.i]: action.payload }
      };
    case "REMOVE_ELEMENT":
      return state;
    case "UPDATE_ELEMENT":
      return update(state, {
        elements: {
          [action.payload.i]: {
            chart: { $set: "MSFT" } // We get error because it does not exist, because we do not create an element with this chart property. Maybe set element as "null" initially.
          }
        }
      });
    default:
      return state;
  }
};

export default gridReducer;
