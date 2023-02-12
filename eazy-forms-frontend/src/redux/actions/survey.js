import { myFirebase } from "../../config/firebase";
import axios from "axios";
import { CONSTANTS } from "../../constants";
import { notify } from "../../components/notification";
import { getAllForms } from "./form";
export const ADD_SURVEY_REQUEST = "ADD_SURVEY_REQUEST";
export const ADD_SURVEY_SUCCESS = "ADD_SURVEY_SUCCESS";
export const ADD_SURVEY_FAILURE = "ADD_SURVEY_FAILURE";
export const ADD_SURVEY_RESET = "ADD_SURVEY_RESET";

export const UPDATE_SURVEY_REQUEST = "UPDATE_SURVEY_REQUEST";
export const UPDATE_SURVEY_SUCCESS = "UPDATE_SURVEY_SUCCESS";
export const UPDATE_SURVEY_FAILURE = "UPDATE_SURVEY_FAILURE";

export const GET_ALL_SURVEYS_REQUEST = "GET_ALL_SURVEYS_REQUEST";
export const GET_ALL_SURVEYS_SUCCESS = "GET_ALL_SURVEYS_SUCCESS";
export const GET_ALL_SURVEYS_FAILURE = "GET_ALL_SURVEYS_FAILURE";

export const GET_SURVEY_BY_ID_REQUEST = "GET_SURVEY_BY_ID_REQUEST";
export const GET_SURVEY_BY_ID_SUCCESS = "GET_SURVEY_BY_ID_SUCCESS";
export const GET_SURVEY_BY_ID_FAILURE = "GET_SURVEY_BY_ID_FAILURE";

// add survey
const requestAddSurvey = () => {
  return {
    type: ADD_SURVEY_REQUEST,
  };
};

const successAddSurvey = () => {
  return {
    type: ADD_SURVEY_SUCCESS,
  };
};

const failureAddSurvey = () => {
  return {
    type: ADD_SURVEY_FAILURE,
  };
};

//update survey
const requestUpdateSurvey = () => {
  return {
    type: UPDATE_SURVEY_REQUEST,
  };
};

const successUpdateSurvey = () => {
  return {
    type: UPDATE_SURVEY_SUCCESS,
  };
};

const failureUpdateSurvey = () => {
  return {
    type: UPDATE_SURVEY_FAILURE,
  };
};

//reset survey state
export const resetAddSurveyState = () => {
  return {
    type: ADD_SURVEY_RESET,
  };
};

//get all surveys
const requestGetAllSurveys = () => {
  return {
    type: GET_ALL_SURVEYS_REQUEST,
  };
};

const successGetAllSurveys = (allSurveys) => {
  return {
    type: GET_ALL_SURVEYS_SUCCESS,
    allSurveys,
  };
};

const failureGetAllSurveys = () => {
  return {
    type: GET_ALL_SURVEYS_FAILURE,
  };
};

//get survey by id
const requestGetSurveyById = () => {
  return {
    type: GET_SURVEY_BY_ID_REQUEST,
  };
};

const successGetSurveyById = (survey) => {
  return {
    type: GET_SURVEY_BY_ID_SUCCESS,
    survey,
  };
};

const failureGetSurveyById = () => {
  return {
    type: GET_SURVEY_BY_ID_FAILURE,
  };
};

export const addSurvey = (survey) => async (dispatch) => {
  dispatch(requestAddSurvey());
  try {
    const url = CONSTANTS.HOST + CONSTANTS.APIS.SURVEY.add();
    const token = await myFirebase.auth().currentUser.getIdToken();
    if (token) {
      const response = await axios.post(
        url,
        { survey },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (response.data && response.data.success === true) {
        dispatch(successAddSurvey());
        dispatch(getAllForms());
        notify("success", "Survey generated");
      } else {
        dispatch(failureAddSurvey());
        notify(
          "error",
          response?.data?.error?.message || "Internal server error"
        );
      }
    } else {
      dispatch(failureAddSurvey());
      notify("error", "User not verified");
    }
  } catch (error) {
    dispatch(failureAddSurvey());
    notify("error", `Survey not created. ${error}`);
  }
};

export const updateSurvey = (survey) => async (dispatch) => {
  dispatch(requestUpdateSurvey());
  try {
    const url = CONSTANTS.HOST + CONSTANTS.APIS.SURVEY.updateInfo();
    const token = await myFirebase.auth().currentUser.getIdToken();
    if (token) {
      const response = await axios.post(
        url,
        { survey },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (response.data && response.data.success === true) {
        dispatch(successUpdateSurvey());
        dispatch(getSurveyById(survey._id));
        notify("success", "Survey updated");
      } else {
        dispatch(failureUpdateSurvey());
        if (response.data && Array.isArray(response.data.error)) {
          notify("error", response.data.error[0]);
        } else {
          console.log({ error: response.data.error });
          notify(
            "error",
            response.data?.error?.message || "Internal server error"
          );
        }
      }
    } else {
      dispatch(failureUpdateSurvey());
      notify("error", "Oops! User not verified");
    }
  } catch (error) {
    dispatch(failureUpdateSurvey());
    notify("error", `Survey not updated. ${error.response.data.error.message}`);
  }
};

export const getAllSurveys = (query) => async (dispatch) => {
  dispatch(requestGetAllSurveys());
  try {
    const url = CONSTANTS.HOST + CONSTANTS.APIS.SURVEY.getAll(query);
    const token = await myFirebase.auth().currentUser.getIdToken();
    if (token) {
      const response = await axios.get(
        url,

        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (response.data && response.data.success === true) {
        dispatch(successGetAllSurveys(response.data.allSurveys));
      } else {
        dispatch(failureGetAllSurveys());
        // notify("error", "Internal server error");
      }
    } else {
      dispatch(failureGetAllSurveys());
      notify("error", "Oops! User not verified");
    }
  } catch (error) {
    dispatch(failureGetAllSurveys());
    notify(
      "error",
      `Surveys not retrieved. ${error.response.data.error.message}`
    );
  }
};

export const getSurveyById = (fid) => async (dispatch) => {
  dispatch(requestGetSurveyById());
  try {
    const url = CONSTANTS.HOST + CONSTANTS.APIS.SURVEY.getById(fid);
    const token = await myFirebase.auth().currentUser.getIdToken();
    if (token) {
      const response = await axios.get(
        url,

        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (response.data && response.data.success === true) {
        dispatch(successGetSurveyById(response.data.survey));
      } else {
        dispatch(failureGetSurveyById());
        // notify("error", "Internal server error");
      }
    } else {
      dispatch(failureGetSurveyById());
      notify("error", "Oops! User not verified");
    }
  } catch (error) {
    dispatch(failureGetSurveyById());
    notify(
      "error",
      `Survey not retrieved. ${error.response.data.error.message}`
    );
  }
};
