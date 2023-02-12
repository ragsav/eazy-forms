const CONSTANTS = {
  HOST: "http://127.0.0.1:4000",
  AUTH_MODAL_TYPE_LOGIN: {
    type: "AUTH_MODAL_TYPE_LOGIN",
    title: "Login form",
  },
  AUTH_MODAL_TYPE_SIGNUP: {
    type: "AUTH_MODAL_TYPE_SIGNUP",
    title: "Sign up form",
  },
  AUTH_MODAL_TYPE_FORGOT: {
    type: "AUTH_MODAL_TYPE_FORGOT",
    title: "Forgot password",
  },

  PUBLIC_FORMS_PAGINATION_SIZE: 20,

  FORM_UPDATE_TYPE: {
    IS_ACTIVE: "IS_ACTIVE",
    IS_EDITABLE: "IS_EDITABLE",
    IS_SIGNIN_REQUIRED: "IS_SIGNIN_REQUIRED",
    IS_PUBLIC: "IS_PUBLIC",
    TITLE: "TITLE",
    DESCRIPTION: "DESCRIPTION",
    QUESTION: "QUESTION",
    SYNC: "SYNC",
  },
  QUESTION_TYPES: {
    SHORT_ANSWER: { name: "Short answer", type: "SHORT_ANSWER" },
    PARAGRAPH: { name: "Paragraph", type: "PARAGRAPH" },
    SINGLE_CHOICE: { name: "Single choice", type: "SINGLE_CHOICE" },
    MULTIPLE_CHOICE: { name: "Multiple choice", type: "MULTIPLE_CHOICE" },
    DROPDOWN: { name: "Dropdown", type: "DROPDOWN" },
    DATE: { name: "Date", type: "DATE" },
    TIME: { name: "Time", type: "TIME" },
    DATE_TIME: { name: "Date and time", type: "DATE_TIME" },
  },

  SHOW_RESPONSE_TYPE: {
    QUESTION_WISE: { type: "QUESTION_WISE", name: "Question wise" },
    INDIVIDUAL: { type: "INDIVIDUAL", name: "Individual" },
  },
  ROUTES: {
    HOME: "/",
    DASHBOARD: "/dashboard",
    BUILDER: "/builder/:fid",
    GET_BUILDER: (fid) => {
      return `/builder/${fid}`;
    },
    BUILDER_RESPONSES: "/builder-responses/:fid",
    GET_BUILDER_RESPONSES: (fid) => {
      return `/builder-responses/${fid}`;
    },
    SURVEY_FORM: "/survey-form/:fid",
    GET_SURVEY_FORM: (fid) => {
      return `/survey-form/${fid}`;
    },
    PUBLIC_FORMS: "/public-forms",
    ERROR: "/error",
  },
  APIS: {
    USER: {
      GET_DB_USER: "/api/user/get",
    },
    USER_FORMS: {
      CREATE: `/api/user-forms/create`,
      GET_FORM_BY_ID: (id) => {
        return `/api/user-forms/data/${id}`;
      },
      GET_RESPONSE_BY_FORM_ID: (id) => {
        return `/api/user-forms/responses/${id}`;
      },
      DELETE: `/api/user-forms/delete`,
      UPDATE: `/api/user-forms/update`,
      ALL: `/api/user-forms/all`,
    },
    SURVEY_FORMS: {
      ALL: "/api/survey-forms/all",
      GET_FORM_BY_ID: (id) => {
        return `/api/survey-forms/data/${id}`;
      },
      SUBMIT_BY_ID: (id) => {
        return `/api/survey-forms/submit/${id}`;
      },
      GET_RESPONSE_BY_ID: (id) => {
        return `/api/survey-forms/response/${id}`;
      },
    },
  },
  ACTIVITY_TYPES: {
    CREATE_PROJECT: {
      type: "CREATE_PROJECT",
      name: "Created project",
    },
    UPDATE_PROJECT_INFO: {
      type: "UPDATE_PROJECT_INFO",
      name: "Updated project info",
    },
    ADD_PROJECT_MEMBER: {
      type: "ADD_PROJECT_MEMBER",
      name: "Added member to project",
    },
    DELETE_PROJECT_MEMBER: {
      type: "DELETE_PROJECT_MEMBER",
      name: "Deleted member from project",
    },
    DELETE_PROJECT: {
      type: "DELETE_PROJECT",
      name: "Deleted project",
    },
    CREATE_FORM: {
      type: "CREATE_FORM",
      name: "Created form",
    },
    UPDATE_FORM_RULES: {
      type: "UPDATE_FORM_RULES",
      name: "Updated form rules",
    },
    UPDATE_FORM_INFO: {
      type: "UPDATE_FORM_INFO",
      name: "Updated form info",
    },
    UPDATE_FORM_SECRET: {
      type: "UPDATE_FORM_SECRET",
      name: "Updated form secret",
    },
    DELETE_FORM: {
      type: "DELETE_FORM",
      name: "Deleted form",
    },
    DELETE_FORM_RESPONSE: {
      type: "DELETE_FORM_RESPONSE",
      name: "Deleted form response",
    },
  },
  ERRORS: {
    SERVER_ERROR: {
      code: "SERVER_ERROR",
      message: "Server error! Please try again.",
    },
    FORM_NOT_FOUND: {
      code: "FORM_NOT_FOUND",
      message: "Form not found. Maybe deleted",
    },
    FORM_NOT_CREATED: {
      code: "FORM_NOT_CREATED",
      message: "Form was not created due to internal server error!",
    },
    FORM_TITLE_INVALID: {
      code: "FORM_TITLE_INVALID",
      message: "Please provide a valid form title!",
    },
    FORM_DESCRIPTION_INVALID: {
      code: "FORM_DESCRIPTION_INVALID",
      message: "Please provide a valid form description!",
    },
  },
};

module.exports = CONSTANTS;
