import { myFirebase } from "../../config/firebase";
import axios from "axios";
import { CONSTANTS } from "../../constants";
import firebase from "firebase/app";

export const SET_FORM_TAB = "SET_FORM_TAB";

export const failureGetAllForms = (formTab) => {
  return {
    type: SET_FORM_TAB,
    formTab,
  };
};
