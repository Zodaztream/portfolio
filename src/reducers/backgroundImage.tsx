interface ActionType {
  type: string;
  payload: string;
}

const backgroundImageReducer = (state: string = "", action: ActionType) => {
  switch (action.type) {
    case "UPDATE_BACKGROUND":
      return action.payload;
    default:
      return state;
  }
};

export default backgroundImageReducer;
