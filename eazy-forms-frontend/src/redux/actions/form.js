import { myFirebase } from "../../config/firebase";
import axios from "axios";
import { CONSTANTS } from "../../constants";
import firebase from "firebase/app";
import { notify } from "../../components/notification";

export const ADD_FORM_REQUEST = "ADD_FORM_REQUEST";
export const ADD_FORM_SUCCESS = "ADD_FORM_SUCCESS";
export const ADD_FORM_FAILURE = "ADD_FORM_FAILURE";
export const ADD_FORM_RESET = "ADD_FORM_RESET";

export const DELETE_FORM_REQUEST = "DELETE_FORM_REQUEST";
export const DELETE_FORM_SUCCESS = "DELETE_FORM_SUCCESS";
export const DELETE_FORM_FAILURE = "DELETE_FORM_FAILURE";
// export const DELETE_FORM_RESET = "DELETE_FORM_RESET";

export const DELETE_RESPONSE_REQUEST = "DELETE_RESPONSE_REQUEST";
export const DELETE_RESPONSE_SUCCESS = "DELETE_RESPONSE_SUCCESS";
export const DELETE_RESPONSE_FAILURE = "DELETE_RESPONSE_FAILURE";

export const UPDATE_FORM_REQUEST = "UPDATE_FORM_REQUEST";
export const UPDATE_FORM_SUCCESS = "UPDATE_FORM_SUCCESS";
export const UPDATE_FORM_FAILURE = "UPDATE_FORM_FAILURE";
export const UPDATE_FORM_TYPE = "UPDATE_FORM_TYPE";

export const GET_ALL_FORMS_REQUEST = "GET_ALL_FORMS_REQUEST";
export const GET_ALL_FORMS_SUCCESS = "GET_ALL_FORMS_SUCCESS";
export const GET_ALL_FORMS_FAILURE = "GET_ALL_FORMS_FAILURE";

export const GET_FORM_BY_ID_REQUEST = "GET_FORM_BY_ID_REQUEST";
export const GET_FORM_BY_ID_SUCCESS = "GET_FORM_BY_ID_SUCCESS";
export const GET_FORM_BY_ID_FAILURE = "GET_FORM_BY_ID_FAILURE";

export const GET_FORM_RESPONSES_REQUEST = "GET_FORM_RESPONSES_REQUEST";
export const GET_FORM_RESPONSES_SUCCESS = "GET_FORM_RESPONSES_SUCCESS";
export const GET_FORM_RESPONSES_FAILURE = "GET_FORM_RESPONSES_FAILURE";

export const GENERATE_SECRET_REQUEST = "GENERATE_SECRET_REQUEST";
export const GENERATE_SECRET_SUCCESS = "GENERATE_SECRET_SUCCESS";
export const GENERATE_SECRET_FAILURE = "GENERATE_SECRET_FAILURE";

// add form
const requestAddForm = () => {
  return {
    type: ADD_FORM_REQUEST,
  };
};

const successAddForm = () => {
  return {
    type: ADD_FORM_SUCCESS,
  };
};

const failureAddForm = () => {
  return {
    type: ADD_FORM_FAILURE,
  };
};

//delete form
const failureDeleteForm = () => {
  return {
    type: DELETE_FORM_FAILURE,
  };
};

const requestDeleteForm = () => {
  return {
    type: DELETE_FORM_REQUEST,
  };
};

const successDeleteForm = () => {
  return {
    type: DELETE_FORM_SUCCESS,
  };
};

//update form
const requestUpdateForm = (updateFormType) => {
  return {
    type: UPDATE_FORM_REQUEST,
    updateFormType,
  };
};

const successUpdateForm = () => {
  return {
    type: UPDATE_FORM_SUCCESS,
  };
};

const failureUpdateForm = () => {
  return {
    type: UPDATE_FORM_FAILURE,
  };
};

//reset form state
export const resetAddFormState = () => {
  return {
    type: ADD_FORM_RESET,
  };
};

//get all forms
const requestGetAllForms = () => {
  return {
    type: GET_ALL_FORMS_REQUEST,
  };
};

const successGetAllForms = (allForms) => {
  return {
    type: GET_ALL_FORMS_SUCCESS,
    allForms,
  };
};

const failureGetAllForms = () => {
  return {
    type: GET_ALL_FORMS_FAILURE,
  };
};

//get form by id
const requestGetFormById = () => {
  return {
    type: GET_FORM_BY_ID_REQUEST,
  };
};

const successGetFormById = (form) => {
  return {
    type: GET_FORM_BY_ID_SUCCESS,
    form,
  };
};

const failureGetFormById = () => {
  return {
    type: GET_FORM_BY_ID_FAILURE,
  };
};

//get all responses
const requestGetFormResponses = () => {
  return {
    type: GET_FORM_RESPONSES_REQUEST,
  };
};

const successGetFormResponses = (currentFormResponses) => {
  return {
    type: GET_FORM_RESPONSES_SUCCESS,
    currentFormResponses,
  };
};

const failureGetFormResponses = () => {
  return {
    type: GET_FORM_RESPONSES_FAILURE,
  };
};

//delete response by id
const successDeleteResponse = () => {
  return {
    type: DELETE_RESPONSE_SUCCESS,
  };
};

const failureDeleteResponse = () => {
  return {
    type: DELETE_RESPONSE_FAILURE,
  };
};

const requestDeleteResponse = () => {
  return {
    type: DELETE_RESPONSE_REQUEST,
  };
};

//generate-secret
const requestGenerateSecret = () => {
  return {
    type: GENERATE_SECRET_REQUEST,
  };
};

const successGenerateSecret = () => {
  return {
    type: GENERATE_SECRET_SUCCESS,
  };
};

const failureGenerateSecret = () => {
  return {
    type: GENERATE_SECRET_FAILURE,
  };
};

export const addForm = (form) => async (dispatch) => {
  dispatch(requestAddForm());
  try {
    const url = CONSTANTS.HOST + CONSTANTS.APIS.FORM.add();
    const token = await myFirebase.auth().currentUser.getIdToken();
    if (token) {
      const response = await axios.post(
        url,
        { form },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (response.data && response.data.success === true) {
        dispatch(successAddForm());
        dispatch(getAllForms());
        notify("success", "Form generated");
      } else {
        dispatch(failureAddForm());
        notify(
          "error",
          response.data?.error?.message || "Internal server error"
        );
      }
    } else {
      dispatch(failureAddForm());
      notify("error", "User not verified");
    }
  } catch (error) {
    dispatch(failureAddForm());
    notify("error", `Form not created. ${error.response.data.error.message}`);
  }
};

export const deleteForm = (fid) => async (dispatch) => {
  dispatch(requestDeleteForm());
  try {
    const url = CONSTANTS.HOST + CONSTANTS.APIS.FORM.delete();
    const token = await myFirebase.auth().currentUser.getIdToken();
    if (token) {
      const response = await axios.post(
        url,
        { fid },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (response.data && response.data.success === true) {
        dispatch(successDeleteForm());
        dispatch(getAllForms());
        notify("success", "Form deleted");
      } else {
        dispatch(failureDeleteForm());
        notify(
          "error",
          response.data?.error?.message || "Internal server error"
        );
      }
    } else {
      dispatch(failureDeleteForm());
      notify("error", "Oops! User not verified");
    }
  } catch (error) {
    dispatch(failureDeleteForm());
    notify("error", `Form not deleted. ${error.response.data.error.message}`);
  }
};

export const generateSecret = (fid) => async (dispatch) => {
  dispatch(requestGenerateSecret());
  try {
    const url = CONSTANTS.HOST + CONSTANTS.APIS.FORM.updateSecret();
    const token = await myFirebase.auth().currentUser.getIdToken();
    if (token) {
      const response = await axios.post(
        url,
        { fid },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (response.data && response.data.success === true) {
        dispatch(successGenerateSecret());
        dispatch(getFormById(fid));
        notify("success", "Secret generation success");
      } else {
        notify("error", "Internal server error");
        dispatch(failureGenerateSecret());
      }
    } else {
      notify("error", "Oops! User not verified");
      dispatch(failureGenerateSecret());
    }
  } catch (error) {
    dispatch(failureGenerateSecret());
    notify(
      "error",
      `Form secret not generated. ${error.response.data.error.message}`
    );
  }
};
export const deleteResponse = (rid, fid, q) => async (dispatch) => {
  dispatch(requestDeleteResponse());
  try {
    const url = CONSTANTS.HOST + CONSTANTS.APIS.FORM.deleteResponse(fid, rid);
    const token = await myFirebase.auth().currentUser.getIdToken();
    if (token) {
      const response = await axios.delete(url, {
        headers: { authorization: `Bearer ${token}` },
      });
      if (response.data && response.data.success === true) {
        dispatch(successDeleteResponse());
        dispatch(getFormResponses(fid, q));
        notify("success", "Response deleted");
      } else {
        dispatch(failureDeleteResponse());
        notify(
          "error",
          response.data?.error?.message || "Internal server error"
        );
      }
    } else {
      dispatch(failureDeleteResponse());
      notify("error", "Oops! User not verified");
    }
  } catch (error) {
    dispatch(failureDeleteResponse());
    notify(
      "error",
      `Form response not deleted. ${error.response.data.error.message}`
    );
  }
};

export const updateForm = (form, type) => async (dispatch) => {
  dispatch(requestUpdateForm(type));
  try {
    const url = CONSTANTS.HOST + CONSTANTS.APIS.FORM.updateInfo();
    const token = await myFirebase.auth().currentUser.getIdToken();
    if (token) {
      const response = await axios.post(
        url,
        { form },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (response.data && response.data.success === true) {
        dispatch(successUpdateForm());
        dispatch(getFormById(form._id));
        notify("success", "Form updated");
      } else {
        dispatch(failureUpdateForm());
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
      dispatch(failureUpdateForm());
      notify("error", "Oops! User not verified");
    }
  } catch (error) {
    dispatch(failureUpdateForm());
    notify("error", `Form not updated. ${error.response.data.error.message}`);
  }
};

export const getAllForms = (query) => async (dispatch) => {
  dispatch(requestGetAllForms());
  try {
    const url = CONSTANTS.HOST + CONSTANTS.APIS.FORM.getAll(query);
    const token = await myFirebase.auth().currentUser.getIdToken();
    if (token) {
      const response = await axios.get(
        url,

        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (response.data && response.data.success === true) {
        dispatch(successGetAllForms(response.data.allForms));
      } else {
        dispatch(failureGetAllForms());
        // notify("error", "Internal server error");
      }
    } else {
      dispatch(failureGetAllForms());
      notify("error", "Oops! User not verified");
    }
  } catch (error) {
    dispatch(failureGetAllForms());
    notify(
      "error",
      `Forms not retrieved. ${error.response.data.error.message}`
    );
  }
};

export const getFormById = (fid) => async (dispatch) => {
  dispatch(requestGetFormById());
  try {
    const url = CONSTANTS.HOST + CONSTANTS.APIS.FORM.getById(fid);
    const token = await myFirebase.auth().currentUser.getIdToken();
    if (token) {
      const response = await axios.get(
        url,

        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (response.data && response.data.success === true) {
        dispatch(successGetFormById(response.data.form));
      } else {
        dispatch(failureGetFormById());
        // notify("error", "Internal server error");
      }
    } else {
      dispatch(failureGetFormById());
      notify("error", "Oops! User not verified");
    }
  } catch (error) {
    dispatch(failureGetFormById());
    notify("error", `Form not retrieved. ${error.response.data.error.message}`);
  }
};

export const getFormResponses = (fid, q) => async (dispatch) => {
  dispatch(requestGetFormResponses());
  try {
    let sortType, sortOrder, query;
    if (q) {
      sortType = q.sortType;
      sortOrder = q.sortOrder;
      query = q.query;
    }
    let localSortType = sortType,
      localSortOrder = sortOrder,
      localQuery = query;
    if (!sortType) {
      localSortType =
        CONSTANTS.RESPONSE_SORT_FILTER.SORT_TYPE.SUBMITTED_AT.value;
    }
    if (!sortOrder) {
      localSortOrder = CONSTANTS.RESPONSE_SORT_FILTER.SORT_ORDER.ASC.value;
    }
    if (!query) {
      query = "";
    }
    const url =
      CONSTANTS.HOST +
      CONSTANTS.APIS.FORM.getResponses(fid, {
        sortType: localSortType,
        sortOrder: localSortOrder,
        query: localQuery,
      });
    const token = await myFirebase.auth().currentUser.getIdToken();
    if (token) {
      const response = await axios.get(
        url,

        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (response.data && response.data.success === true) {
        dispatch(successGetFormResponses(response.data.responses));
      } else {
        dispatch(failureGetFormResponses());
        console.log(response.data.error);
        // notify("error", "Internal server error");
      }
    } else {
      dispatch(failureGetFormResponses());
      notify("error", "Oops! User not verified");
    }
  } catch (error) {
    dispatch(failureGetFormResponses());
    notify(
      "error",
      `Form responses not retrieved. ${error.response.data.error.message}`
    );
  }
};
