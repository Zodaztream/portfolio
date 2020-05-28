interface ActionType {
  type: string;
  payload: string;
}

/**
 * @description This redux reducer handles the background to display
 */
const backgroundImageReducer = (state: string = "", action: ActionType) => {
  switch (action.type) {
    case "UPDATE_BACKGROUND":
      return action.payload;
    default:
      return state;
  }
};

export default backgroundImageReducer;
