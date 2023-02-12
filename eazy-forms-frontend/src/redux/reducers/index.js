import { combineReducers } from "redux";
import auth from "./auth";
import form from "./form";
import survey from "./survey";
import misc from "./misc";

export default combineReducers({
  auth,
  form,
  misc,
  survey,
});
