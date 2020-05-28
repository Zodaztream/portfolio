interface messageType {
  type: string;
  payload: { message: string; error: boolean };
}

/**
 * @description This redux reducer handles the global message
 */
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
