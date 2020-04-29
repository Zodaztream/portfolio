import { Element } from "../components/types";
export const increment = (/*Arg: type */) => {
  return {
    type: "INCREMENT"
    //payload: Arg
  };
};

export const edit = () => {
  return {
    type: "TOGGLE_EDIT"
  };
};

export const addElement = (gridCell: Element) => {
  return {
    type: "ADD_ELEMENT",
    payload: gridCell
  };
};

export const updateElement = (gridCell: Element) => {
  return {
    type: "UPDATE_ELEMENT", // ideally, should be enum types instead of strings (for safety)
    payload: gridCell
  };
};

export const updateSizePos = (gridCell: Element) => {
  return {
    type: "UPDATE_SIZE_AND_POSITION",
    payload: gridCell
  };
};
//export const decrement
