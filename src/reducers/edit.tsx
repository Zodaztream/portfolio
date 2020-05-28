interface editTypes {
  type: string;
}

/**
 * @description This redux reducer handles the boolean for the edit variable
 * which will toggle the edit state.
 */
const editReducer = (state: boolean = false, action: editTypes) => {
  switch (action.type) {
    case "TOGGLE_EDIT":
      return !state;
    default:
      return state;
  }
};

export default editReducer;
