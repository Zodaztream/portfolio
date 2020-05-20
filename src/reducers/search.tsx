interface searchTypes {
  type: string;
  payload: boolean;
}

// default state is 0, next time this is called, the state is called from data storage instead.
const searchReducer = (state: boolean = false, action: searchTypes) => {
  switch (action.type) {
    case "SET_SEARCHING":
      return action.payload;
    default:
      return state;
  }
};

export default searchReducer;
