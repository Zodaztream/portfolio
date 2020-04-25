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

interface Element {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export const addElement = (gridCell: Element) => {
  return {
    type: "ADD_ELEMENT",
    payload: gridCell
  };
};
//export const decrement
