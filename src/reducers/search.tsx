interface searchTypes {
  type: string;
  payload: boolean;
}

/**
 * @description This redux reducer handles the boolean search state.
 */
const searchReducer = (state: boolean = false, action: searchTypes) => {
  switch (action.type) {
    case "SET_SEARCHING":
      return action.payload;
    default:
      return state;
  }
};

export default searchReducer;
