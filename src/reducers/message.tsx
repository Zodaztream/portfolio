interface messageType {
  type: string;
  payload: { message: string; error: boolean };
}

// default state is 0, next time this is called, the state is called from data storage instead.
const messageReducer = (
  state = { message: "", error: false },
  action: messageType
) => {
  switch (action.type) {
    case "SET_MESSAGE":
      return action.payload;
    default:
      return state;
  }
};

export default messageReducer;
