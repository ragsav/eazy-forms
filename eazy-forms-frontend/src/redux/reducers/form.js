import { CONSTANTS } from "../../constants";
import {
  ADD_FORM_REQUEST,
  ADD_FORM_SUCCESS,
  ADD_FORM_FAILURE,
  ADD_FORM_RESET,

  UPDATE_FORM_REQUEST,
  UPDATE_FORM_SUCCESS,
  UPDATE_FORM_FAILURE,

  GET_ALL_FORMS_REQUEST,
  GET_ALL_FORMS_SUCCESS,
  GET_ALL_FORMS_FAILURE,

  GET_FORM_BY_ID_REQUEST,
  GET_FORM_BY_ID_SUCCESS,
  GET_FORM_BY_ID_FAILURE,

  GET_FORM_RESPONSES_REQUEST,
  GET_FORM_RESPONSES_SUCCESS,
  GET_FORM_RESPONSES_FAILURE,

  DELETE_FORM_REQUEST,
  DELETE_FORM_SUCCESS,
  DELETE_FORM_FAILURE,

  DELETE_RESPONSE_REQUEST,
  DELETE_RESPONSE_SUCCESS,
  DELETE_RESPONSE_FAILURE,
  
  GENERATE_SECRET_FAILURE,
  GENERATE_SECRET_SUCCESS,
  GENERATE_SECRET_REQUEST,
} from "../actions";

export default (
  state = {
    isAddingForm: false,
    addFormSuccess: false,
    addFormFailure: false,

    isDeletingForm: false,
    deleteFormSuccess: false,
    deleteFormFailure: false,

    isDeletingResponse: false,
    deleteResponseSuccess: false,
    deleteResponseFailure: false,

    isUpdatingForm: false,
    updateFormSuccess: false,
    updateFormFailure: false,
    updateFormType:null,

    isGettingAllForms: false,
    getAllFormsSuccess: false,
    getAllFormsFailure: false,

    isGettingFormById: false,
    getFormByIdSuccess: false,
    getFormByIdFailure: false,

    isGettingFormResponses: false,
    getFormResponsesSuccess: false,
    getFormResponsesFailure: false,

    allForms: null,
    currentForm: null,
  },
  action
) => {
  switch (action.type) {
    case ADD_FORM_REQUEST:
      return {
        ...state,
        isAddingForm: true,
        addFormSuccess: false,
        addFormFailure: false,
      };
    case ADD_FORM_SUCCESS:
      return {
        ...state,
        isAddingForm: false,
        addFormSuccess: true,
        addFormFailure: false,
      };
    case ADD_FORM_FAILURE:
      return {
        ...state,
        isAddingForm: false,
        addFormSuccess: false,
        addFormFailure: true,
      };

    case DELETE_FORM_REQUEST:
      return {
        ...state,
        isDeletingForm: true,
        deleteFormSuccess: false,
        deleteFormFailure: false,
      };
    case DELETE_FORM_SUCCESS:
      return {
        ...state,
        isDeletingForm: false,
        deleteFormSuccess: true,
        deleteFormFailure: false,
      };
    case DELETE_FORM_FAILURE:
      return {
        ...state,
        isDeletingForm: false,
        deleteFormSuccess: false,
        deleteFormFailure: true,
      };

    case DELETE_RESPONSE_REQUEST:
      return {
        ...state,
        isDeletingResponse: true,
        deleteResponseSuccess: false,
        deleteResponseFailure: false,
      };
    case DELETE_RESPONSE_SUCCESS:
      return {
        ...state,
        isDeletingResponse: false,
        deleteResponseSuccess: true,
        deleteResponseFailure: false,
      };
    case DELETE_RESPONSE_FAILURE:
      return {
        ...state,
        isDeletingResponse: false,
        deleteResponseSuccess: false,
        deleteResponseFailure: true,
      };

    case UPDATE_FORM_REQUEST:
      console.log({updateFormType:action.updateFormType})
      return {
        ...state,
        isUpdatingForm: true,
        updateFormSuccess: false,
        updateFormFailure: false,
        updateFormType:action.updateFormType
      };
    case UPDATE_FORM_SUCCESS:
      return {
        ...state,
        isUpdatingForm: false,
        updateFormSuccess: true,
        updateFormFailure: false,
        updateFormType:null
      };
    case UPDATE_FORM_FAILURE:
      return {
        ...state,
        isUpdatingForm: false,
        updateFormSuccess: false,
        updateFormFailure: true,
        updateFormType:null
      };

    case ADD_FORM_RESET:
      return {
        ...state,
        isAddingForm: false,
        addFormSuccess: false,
        addFormFailure: false,
      };

    case GET_ALL_FORMS_REQUEST:
      return {
        ...state,
        isGettingAllForms: true,
        getAllFormsSuccess: false,
        getAllFormsFailure: false,
      };
    case GET_ALL_FORMS_SUCCESS: {
      const localCurrentForm = null;
      if (state.currentForm) {
        action.allForms.forEach((form) => {
          if (form._id === state.currentForm.id) {
            localCurrentForm = { ...form };
          }
        });
      }

      return {
        ...state,
        isGettingAllForms: false,
        getAllFormsSuccess: true,
        getAllFormsFailure: false,
        allForms: action.allForms,
        currentForm: localCurrentForm,
      };
    }
    case GET_ALL_FORMS_FAILURE:
      return {
        ...state,
        isGettingAllForms: false,
        getAllFormsSuccess: false,
        getAllFormsFailure: true,
      };

    case GET_FORM_BY_ID_REQUEST:
      return {
        ...state,
        isGettingFormById: true,
        getFormByIdSuccess: false,
        getFormByIdFailure: false,
      };
    case GET_FORM_BY_ID_SUCCESS:
      return {
        ...state,
        isGettingFormById: false,
        getFormByIdSuccess: true,
        getFormByIdFailure: false,
        currentForm: {
          responses: state.currentForm?.responses,
          ...action.form,
        },
      };
    case GET_FORM_BY_ID_FAILURE:
      return {
        ...state,
        isGettingFormById: false,
        getFormByIdSuccess: false,
        getFormByIdFailure: true,
        currentForm: null,
      };

    case GET_FORM_RESPONSES_REQUEST:
      return {
        ...state,
        isGettingFormResponses: true,
        getFormResponsesSuccess: false,
        getFormResponsesFailure: false,
      };
    case GET_FORM_RESPONSES_SUCCESS:
      return {
        ...state,
        isGettingFormResponses: false,
        getFormResponsesSuccess: true,
        getFormResponsesFailure: false,
        currentForm: {
          ...state.currentForm,
          responses: action.currentFormResponses,
        },
      };
    case GET_FORM_RESPONSES_FAILURE:
      return {
        ...state,
        isGettingFormResponses: false,
        getFormResponsesSuccess: false,
        getFormResponsesFailure: true,
      };

    case GENERATE_SECRET_REQUEST:
      return {
        ...state,
        isGeneratingSecret: true,
        generateSecretSuccess: false,
        generateSecretFailure: false,
      };
    case GENERATE_SECRET_SUCCESS:
      return {
        ...state,
        isGeneratingSecret: false,
        generateSecretSuccess: true,
        generateSecretFailure: false,
        user: action.user,
      };
    case GENERATE_SECRET_FAILURE:
      return {
        ...state,
        isGeneratingSecret: false,
        generateSecretSuccess: false,
        generateSecretFailure: true,
      };
    default:
      return state;
  }
};
