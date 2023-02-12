import { Avatar, CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import React from "react";
// import AuthModal from "../authModal/authModal";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Add from "@material-ui/icons/Add";
import "./style.scss";
import ProfilePopover from "../profilePopover/profilePopover";
import logo from "../../assets/logo-1-512.png";
import { Link } from "react-router-dom";
import { CONSTANTS } from "../../constants";
import { resetAddFormState } from "../../redux/actions";
import SurveyFormSwitch from "../surveyFormSwitch/surveyFormSwitch";
const AuthModal = React.lazy(() => import("../authModal/authModal"));
const AddFormModal = React.lazy(() => import("../addFormModal/addFormModal"));
const Navbar = ({ isVerifyingUser, verifyUserSuccess, user, dispatch }) => {
  const handleResetAddFormState = () => {
    dispatch(resetAddFormState());
  };
  return (
    <nav className=" navbar py-2 px-4 navbar-expand-lg navbar-light bg-light w-100">
      <React.Suspense fallback={() => <div></div>}>
        <AuthModal />
      </React.Suspense>
      <React.Suspense fallback={() => <div></div>}>
        <AddFormModal />
      </React.Suspense>

      <ProfilePopover />
      <div className="eazy-container w-100 d-flex flex-row justify-content-between align-items-center px-0">
        <div className="d-flex flex-row justify-content-start align-items-center">
          <a className="navbar-brand nav-logo" href="/">
            <div className="d-flex flex-row align-items-center">
              <img src={logo} className="logo me-2" alt="Ezforms logo" />
              <span className="hide">Ezforms</span>
            </div>
          </a>
          <Link to="/docs" className="ms-3">
            Docs
          </Link>
          <a
            href="https://github.com/ragsav/eazy-forms-frontend"
            className="ms-3"
            target="_blank"
          >
            Github
          </a>
          {verifyUserSuccess ? (
            // <Link to="/survey" className="ms-3 new-feature-badge">
            //   Surveys
            // </Link>
            <SurveyFormSwitch />
          ) : null}
        </div>

        <div className="d-flex flex-row justify-content-end align-items-center">
          {verifyUserSuccess ? (
            <button
              className="special-btn p-1 px-2 me-3 d-flex flex-row justify-content-start align-items-center"
              data-bs-toggle="modal"
              data-bs-target="#add-form-modal"
              onClick={handleResetAddFormState}
            >
              <Add />
              <span>New form</span>
            </button>
          ) : null}

          {/* {verifyUserSuccess ? (
            <Link to={CONSTANTS.ROUTES.DASHBOARD.skeleton} className="me-3">
              Dashboard
            </Link>
          ) : null} */}

          {isVerifyingUser ? (
            <CircularProgress size={30} style={{ color: "white" }} />
          ) : verifyUserSuccess ? (
            <div
              // onClick={handleLogout}
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#profile-modal"
            >
              <Avatar
                src={user.picture}
                className="nav-user-avatar"
                alt={user.name}
              >
                {user.picture ? null : (
                  <AccountCircleIcon
                    fontSize="large"
                    style={{ color: "#9d80c3" }}
                  />
                )}
              </Avatar>
            </div>
          ) : (
            <div>
              <button
                className="secondary-btn"
                data-bs-toggle="modal"
                data-bs-target="#auth-modal"
              >
                Sign in
              </button>
            </div>
            // <GoogleSignInButton/>
          )}
        </div>
      </div>
    </nav>
  );
};
function mapStateToProps(state) {
  return {
    isVerifyingUser: state.auth.isVerifyingUser,
    verifyUserSuccess: state.auth.verifyUserSuccess,
    user: state.auth.user,
  };
}
export default connect(mapStateToProps)(Navbar);
