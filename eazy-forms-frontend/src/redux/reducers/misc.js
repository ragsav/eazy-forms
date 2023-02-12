import { CONSTANTS } from "../../constants";
import { SET_FORM_TAB } from "../actions";

export default (
  state = {
    formTab: CONSTANTS.FORM_TABS.RESPONSE.type,
  },
  action
) => {
  switch (action.type) {
    case SET_FORM_TAB:
      return {
        ...state,
        formTab: action.formTab,
      };

    default:
      return state;
  }
};
