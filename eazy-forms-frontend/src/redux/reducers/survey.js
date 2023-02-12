import { CONSTANTS } from "../../constants";
import {
  ADD_SURVEY_REQUEST,
  ADD_SURVEY_SUCCESS,
  ADD_SURVEY_FAILURE,
  ADD_SURVEY_RESET,
  UPDATE_SURVEY_REQUEST,
  UPDATE_SURVEY_SUCCESS,
  UPDATE_SURVEY_FAILURE,
  GET_ALL_SURVEYS_REQUEST,
  GET_ALL_SURVEYS_SUCCESS,
  GET_ALL_SURVEYS_FAILURE,
  GET_SURVEY_BY_ID_REQUEST,
  GET_SURVEY_BY_ID_SUCCESS,
  GET_SURVEY_BY_ID_FAILURE,
} from "../actions";

export default (
  state = {
    isAddingSurvey: false,
    addSurveySuccess: false,
    addSurveyFailure: false,

    isUpdatingSurvey: false,
    updateSurveySuccess: false,
    updateSurveyFailure: false,
    updateSurveyType: null,

    isGettingAllSurveys: false,
    getAllSurveysSuccess: false,
    getAllSurveysFailure: false,

    isGettingSurveyById: false,
    getSurveyByIdSuccess: false,
    getSurveyByIdFailure: false,

    allSurveys: null,
    currentSurvey: null,
  },
  action
) => {
  switch (action.type) {
    case ADD_SURVEY_REQUEST:
      return {
        ...state,
        isAddingSurvey: true,
        addSurveySuccess: false,
        addSurveyFailure: false,
      };
    case ADD_SURVEY_SUCCESS:
      return {
        ...state,
        isAddingSurvey: false,
        addSurveySuccess: true,
        addSurveyFailure: false,
      };
    case ADD_SURVEY_FAILURE:
      return {
        ...state,
        isAddingSurvey: false,
        addSurveySuccess: false,
        addSurveyFailure: true,
      };

    case UPDATE_SURVEY_REQUEST:
      return {
        ...state,
        isUpdatingSurvey: true,
        updateSurveySuccess: false,
        updateSurveyFailure: false,
      };
    case UPDATE_SURVEY_SUCCESS:
      return {
        ...state,
        isUpdatingSurvey: false,
        updateSurveySuccess: true,
        updateSurveyFailure: false,
      };
    case UPDATE_SURVEY_FAILURE:
      return {
        ...state,
        isUpdatingSurvey: false,
        updateSurveySuccess: false,
        updateSurveyFailure: true,
      };

    case ADD_SURVEY_RESET:
      return {
        ...state,
        isAddingSurvey: false,
        addSurveySuccess: false,
        addSurveyFailure: false,
      };

    case GET_ALL_SURVEYS_REQUEST:
      return {
        ...state,
        isGettingAllSurveys: true,
        getAllSurveysSuccess: false,
        getAllSurveysFailure: false,
      };
    case GET_ALL_SURVEYS_SUCCESS: {
      const localCurrentSurvey = null;
      if (state.currentSurvey) {
        action.allSurveys.forEach((survey) => {
          if (survey._id === state.currentSurvey.id) {
            localCurrentSurvey = { ...survey };
          }
        });
      }

      return {
        ...state,
        isGettingAllSurveys: false,
        getAllSurveysSuccess: true,
        getAllSurveysFailure: false,
        allSurveys: action.allSurveys,
        currentSurvey: localCurrentSurvey,
      };
    }
    case GET_ALL_SURVEYS_FAILURE:
      return {
        ...state,
        isGettingAllSurveys: false,
        getAllSurveysSuccess: false,
        getAllSurveysFailure: true,
      };

    case GET_SURVEY_BY_ID_REQUEST:
      return {
        ...state,
        isGettingSurveyById: true,
        getSurveyByIdSuccess: false,
        getSurveyByIdFailure: false,
      };
    case GET_SURVEY_BY_ID_SUCCESS:
      return {
        ...state,
        isGettingSurveyById: false,
        getSurveyByIdSuccess: true,
        getSurveyByIdFailure: false,
        currentSurvey: {
          responses: state.currentSurvey?.responses,
          ...action.survey,
        },
      };
    case GET_SURVEY_BY_ID_FAILURE:
      return {
        ...state,
        isGettingSurveyById: false,
        getSurveyByIdSuccess: false,
        getSurveyByIdFailure: true,
        currentSurvey: null,
      };

    default:
      return state;
  }
};
