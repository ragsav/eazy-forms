import {
  LOGIN_WITH_GMAIL_REQUEST,
  LOGIN_WITH_GMAIL_SUCCESS,
  LOGIN_WITH_GMAIL_FAILURE,
  LOGIN_WITH_GITHUB_REQUEST,
  LOGIN_WITH_GITHUB_SUCCESS,
  LOGIN_WITH_GITHUB_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  VERIFY_USER_FAILURE,
  VERIFY_USER_SUCCESS,
  VERIFY_USER_REQUEST,
} from "../actions";

export default (
  state = {
    isLoggingInWithGmail: false,
    loginWithGmailSuccess: false,
    loginWithGmailFailure: false,

    isLoggingInWithGithub: false,
    loginWithGithubSuccess: false,
    loginWithGithubFailure: false,

    isLoggingOut: false,
    logoutSuccess: false,
    logoutFailure: false,

    isVerifyingUser: false,
    verifyUserSuccess: false,
    verifyUserFailure: false,

    isGeneratingSecret: false,
    generateSecretSuccess: false,
    generateSecretFailure: false,

    user: null,
  },
  action
) => {
  switch (action.type) {
    case LOGIN_WITH_GMAIL_REQUEST:
      return {
        ...state,
        isLoggingInWithGmail: true,
        loginWithGmailSuccess: false,
        loginWithGmailFailure: false,
      };
    case LOGIN_WITH_GMAIL_SUCCESS:
      return {
        ...state,
        isLoggingInWithGmail: false,
        loginWithGmailSuccess: true,
        loginWithGmailFailure: false,
      };
    case LOGIN_WITH_GMAIL_FAILURE:
      return {
        ...state,
        isLoggingInWithGmail: false,
        loginWithGmailSuccess: false,
        loginWithGmailFailure: true,
      };

    case LOGIN_WITH_GITHUB_REQUEST:
      return {
        ...state,
        isLoggingInWithGithub: true,
        loginWithGithubSuccess: false,
        loginWithGithubFailure: false,
      };
    case LOGIN_WITH_GITHUB_SUCCESS:
      return {
        ...state,
        isLoggingInWithGithub: false,
        loginWithGithubSuccess: true,
        loginWithGithubFailure: false,
      };
    case LOGIN_WITH_GITHUB_FAILURE:
      return {
        ...state,
        isLoggingInWithGithub: false,
        loginWithGithubSuccess: false,
        loginWithGithubFailure: true,
      };

    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoggingOut: true,
        logoutSuccess: false,
        logoutFailure: false,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggingInWithGmail: false,
        loginWithGmailSuccess: false,
        loginWithGmailFailure: false,

        isLoggingInWithGithub: false,
        loginWithGithubSuccess: false,
        loginWithGithubFailure: false,

        isLoggingOut: false,
        logoutSuccess: true,
        logoutFailure: false,

        isVerifyingUser: false,
        verifyUserSuccess: false,
        verifyUserFailure: false,

        user: null,
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        isLoggingOut: false,
        logoutSuccess: false,
        logoutFailure: true,
      };
    case VERIFY_USER_REQUEST:
      return {
        ...state,
        isVerifyingUser: true,
        verifyUserSuccess: false,
        verifyUserFailure: false,
      };
    case VERIFY_USER_SUCCESS:
      return {
        ...state,
        isVerifyingUser: false,
        verifyUserSuccess: true,
        verifyUserFailure: false,
        user: action.user,
      };
    case VERIFY_USER_FAILURE:
      return {
        ...state,
        isVerifyingUser: false,
        verifyUserSuccess: false,
        verifyUserFailure: true,
        user: null,
      };

    default:
      return state;
  }
};
