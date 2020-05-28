interface ActionType {
  type: string;
}

/**
 * @description This redux reducer will toggle the account menu
 */
const toggleAccountMenuReducer = (
  state: boolean = false,
  action: ActionType
) => {
  switch (action.type) {
    case "TOGGLE_MENU":
      return !state;
    default:
      return state;
  }
};

export default toggleAccountMenuReducer;
