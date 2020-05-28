import { Reducer } from "redux";
import { Element } from "../components/types";
import { access } from "fs";
import update from "immutability-helper";
import { ElementState } from "../components/types";

interface ActionType {
  type: string;
  payload: Element;
}

interface innerElement {
  [key: string]: Element;
}

const initialUserState: ElementState = {
  elements: {}
};

/**
 *
 * @description This redux reducer handles the grid elements, and manipulates the grid elements with the help
 * of immutability-helper
 */
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
      return update(state, {
        elements: {
          $apply: function(obj: innerElement) {
            var copy = Object.assign({}, obj);
            delete copy[action.payload.i];
            return copy;
          }
        }
      });
    case "UPDATE_ELEMENT": // change this to UPDATE_CHART or something
      return update(state, {
        elements: {
          [action.payload.i]: {
            chart: { $set: action.payload.chart } // We get error because it does not exist, because we do not create an element with this chart property. Maybe set element as "null" initially.
          }
        }
      });
    case "UPDATE_SIZE_AND_POSITION":
      return update(state, {
        elements: {
          [action.payload.i]: {
            x: { $set: action.payload.x },
            y: { $set: action.payload.y },
            w: { $set: action.payload.w },
            h: { $set: action.payload.h }
          }
        }
      });
    case "CLEAR_ALL":
      return update(state, () => {
        return initialUserState;
      });
    default:
      return state;
  }
};

export default gridReducer;
