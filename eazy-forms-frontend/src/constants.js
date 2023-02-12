export const CONSTANTS = Object.freeze({
  HOST: process.env.NODE_ENV === "development" ? "http://localhost:4000" : "https://eazy-forms.onrender.com",
  RULES: {
    required: "required",
    isString: "isString",
    isDate: "isDate",
    isInt: "isInt",
    isDecimal: "isDecimal",
    isFloat: "isFloat",
    isJSON: "isJSON",
    isAlpha: "isAlpha",
    isAlphanumeric: "isAlphanumeric",
    isBoolean: "isBoolean",
    isEmail: "isEmail",
    isURL: "isURL",
    isHexadecimal: "isHexadecimal",
    isRgbColor: "isRgbColor",
    isHexColor: "isHexColor",
    isHSL: "isHSL",
    isLatLong: "isLatLong",
    isNumeric: "isNumeric",
    maxLength: "maxLength",
    minLength: "minLength",
    maxDate: "maxDate",
    minDate: "minDate",
    maxInt: "maxInt",
    minInt: "minInt",
    maxFloat: "maxFloat",
    minFloat: "minFloat",
    allowedValues: "allowedValues",
  },
  FORM_UPDATE_TYPE: {
    INFO: "INFO",
    TELEGRAM: "TELEGRAM",
    SLACK: "SLACK",
  },
  APIS: {
    USER: {
      getSelf: () => "/internal/user/self",
    },
    FORM: {
      add: () => "/internal/form/add",
      delete: () => "/internal/form/delete",
      getAll: (query) => {
        if (query) {
          return `/internal/form/all?query=${query}`;
        } else return "/internal/form/all";
      },
      getResponses: (fid, { sortType, sortOrder, query }) => `/internal/response/${fid}?query=${query}&sortType=${sortType}&sortOrder=${sortOrder}`,
      getById: (fid) => `/internal/form/get/${fid}`,
      updateInfo: () => `/internal/form/update-info`,
      updateRules: () => `/internal/form/update-rules`,
      updateSecret: () => `/internal/form/update-secret`,
      deleteResponse: (fid, rid) => {
        return `/internal/response/${fid}/${rid}`;
      },
    },
    SURVEY: {
      add: () => "/internal/survey/add",
      getAll: () => {
        return "/internal/form/all";
      },
      getById: (sid) => `/internal/survey/get/${sid}`,
      updateInfo: () => `/internal/form/update`,
    },
  },
  RESPONSE_SORT_FILTER: {
    SORT_TYPE: {
      SUBMITTED_AT: {
        type: "SUBMITTED_AT",
        name: "Submitted at",
        value: "createdAt",
      },
    },
    SORT_ORDER: {
      ASC: { type: "ASC", name: "Asc", value: 1 },
      DESC: { type: "DESC", name: "Desc", value: -1 },
    },
  },
  // FORM_UPDATE_TYPE: {
  //   RULES: "RULES",
  //   ACTIVE: "ACTIVE",
  //   STAR: "STAR",
  //   TELEGRAM_WEBHOOKS: "TELEGRAM_WEBHOOKS",
  //   SLACK_WEBHOOKS: "SLACK_WEBHOOKS",
  // },
  FORM_TABS: {
    INTEGRATION: { type: "INTEGRATION", name: "Integration" },
    RESPONSE: { type: "RESPONSE", name: "Response" },
    SPAM: { type: "SPAM", name: "Spam" },
    EDIT: { type: "EDIT", name: "Edit" },
    SURVEY: { type: "SURVEY", name: "Publish survey" },
    RULES: { type: "RULES", name: "Rules" },
  },
  ROUTES: {
    DASHBOARD: {
      skeleton: "/",
      route: "/",
    },
    SURVEYBUILDER: {
      skeleton: "/builder",
      route: "/builder",
    },
    SURVEYUPDATER: {
      skeleton: "/survey-updater/:sid",
      route: (sid) => `/survey-updater/${sid}`,
    },

    FORM_RESPONSE: {
      skeleton: "/response/:fid",
      route: (fid) => {
        return `/response/${fid}`;
      },
    },
    FORM_SPAM: {
      skeleton: "/spam/:fid",
      route: (fid) => {
        return `/spam/${fid}`;
      },
    },
    FORM_INTEGRATION: {
      skeleton: "/integration/:fid",
      route: (fid) => {
        return `/integration/${fid}`;
      },
    },
    FORM_EDIT: {
      skeleton: "/edit/:fid",
      route: (fid) => {
        return `/edit/${fid}`;
      },
    },
    SURVEY_BUILDER: {
      skeleton: "/builder/:fid",
      route: (fid) => {
        return `/builder/${fid}`;
      },
    },
    FORM_RULES: {
      skeleton: "/rules/:fid",
      route: (fid) => {
        return `/rules/${fid}`;
      },
    },
    HOME: {
      skeleton: "/home",
      route: "/home",
    },
  },
});
