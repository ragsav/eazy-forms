import { myFirebase } from "../../config/firebase";
import axios from "axios";
import { CONSTANTS } from "../../constants";
import firebase from "firebase/app";
import { notify } from "../../components/notification";
export const LOGIN_WITH_GMAIL_REQUEST = "LOGIN_WITH_GMAIL_REQUEST";
export const LOGIN_WITH_GMAIL_SUCCESS = "LOGIN_WITH_GMAIL_SUCCESS";
export const LOGIN_WITH_GMAIL_FAILURE = "LOGIN_WITH_GMAIL_FAILURE";

export const LOGIN_WITH_GITHUB_REQUEST = "LOGIN_WITH_GITHUB_REQUEST";
export const LOGIN_WITH_GITHUB_SUCCESS = "LOGIN_WITH_GITHUB_SUCCESS";
export const LOGIN_WITH_GITHUB_FAILURE = "LOGIN_WITH_GITHUB_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const VERIFY_USER_REQUEST = "VERIFY_USER_REQUEST";
export const VERIFY_USER_SUCCESS = "VERIFY_USER_SUCCESS";
export const VERIFY_USER_FAILURE = "VERIFY_USER_FAILURE";

const requestLoginGmail = () => {
  return {
    type: LOGIN_WITH_GMAIL_REQUEST,
  };
};

const successLoginGmail = () => {
  return {
    type: LOGIN_WITH_GMAIL_SUCCESS,
  };
};

const failureLoginGmail = () => {
  return {
    type: LOGIN_WITH_GMAIL_FAILURE,
  };
};

const requestLoginGithub = () => {
  return {
    type: LOGIN_WITH_GITHUB_REQUEST,
  };
};

const successLoginGithub = () => {
  return {
    type: LOGIN_WITH_GITHUB_SUCCESS,
  };
};

const failureLoginGithub = () => {
  return {
    type: LOGIN_WITH_GITHUB_FAILURE,
  };
};

const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST,
  };
};

const successLogout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

const failureLogout = () => {
  return {
    type: LOGOUT_FAILURE,
  };
};

const requestVerifyUser = () => {
  return {
    type: VERIFY_USER_REQUEST,
  };
};

const successVerifyUser = (user) => {
  return {
    type: VERIFY_USER_SUCCESS,
    user,
  };
};

const failureVerifyUser = () => {
  return {
    type: VERIFY_USER_FAILURE,
  };
};

export const loginUserWithGmail = () => async (dispatch) => {
  var provider = new firebase.auth.GoogleAuthProvider();
  const wakeUpServer = axios.get(CONSTANTS.HOST);
  dispatch(requestLoginGmail());
  myFirebase
    .auth()
    .signInWithRedirect(provider)
    .then(() => {
      dispatch(successLoginGmail());
    })
    .catch((error) => {
      notify("error", "Google signin failed");
      console.log({error})
      dispatch(failureLoginGmail());
    });
};

export const loginUserWithGithub = () => async (dispatch) => {
  var provider = new firebase.auth.GithubAuthProvider();

  dispatch(requestLoginGithub());
  myFirebase
    .auth()
    .signInWithRedirect(provider)
    .then((result) => {
      dispatch(successLoginGithub());
    })
    .catch((error) => {
      notify("error", "Google signin failed");
      dispatch(failureLoginGithub());
    });
};

export const logoutUser = () => async (dispatch) => {
  dispatch(requestLogout());
  myFirebase
    .auth()
    .signOut()
    .then(() => {
      dispatch(successLogout());
    })
    .catch((error) => {
      dispatch(failureLogout());
    });
};

export const getUserFromDB = () => async (dispatch) => {
  
  dispatch(requestVerifyUser());
  try{
    const url = CONSTANTS.HOST + CONSTANTS.APIS.USER.getSelf();
    const token = await myFirebase.auth().currentUser.getIdToken();
    if (token) {
      const response = await axios.get(url, {
        headers: { authorization: `Bearer ${token}` },
      });
      if (response.data && response.data.success === true) {
        dispatch(successVerifyUser(response.data.user));
      } else {
        dispatch(failureVerifyUser());
        dispatch(successLogout());
        notify("error", "Internal server error");
      }
    } else {
      dispatch(failureVerifyUser());
      dispatch(successLogout());
      notify("error", "Oops! Something went wrong");
    }
  }catch(error){
    dispatch(failureVerifyUser());
    dispatch(successLogout());
    notify("error",`Form not created. ${error.response.data.error.message}`);
  }
  
};


export const verifyAuth = () => async (dispatch) => {
  dispatch(requestVerifyUser());
  myFirebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      dispatch(getUserFromDB());
    } else {
      // notify("error", "User login failed");
      dispatch(failureVerifyUser());
      dispatch(successLogout());
    }
  });
};
