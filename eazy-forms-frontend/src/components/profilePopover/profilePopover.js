import { Avatar, CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import "./style.scss";
import { generateSecret, logoutUser } from "../../redux/actions";
import { connect } from "react-redux";
const ProfilePopover = ({ isGeneratingSecret, user, dispatch }) => {
  
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div
      className="modal  fade"
      id="profile-modal"
      tabIndex="-1"
      aria-labelledby="profile-modal"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Profile
            </h5>
            <button
              type="button"
              className="btn-close no-focus-outline-btn"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body d-flex flex-column justify-content-start align-items-start">
            <div className="d-flex flex-row justify-content-start align-items-start">
              <Avatar src={user?.picture} style={{ height: 60, width: 60 }} />
              <div className="d-flex flex-column align-items-start justify-content-start ms-3">
                <span className="mt-2 user-name">{user?.name}</span>
                <span className="mt-1 user-email">{user?.email}</span>
              </div>
            </div>
          </div>
          <div className="modal-footer ">
            <button
              onClick={handleLogout}
              className="primary-outline-btn"
              data-bs-dismiss="modal"
            >
              Sign out
              <ExitToAppIcon fontSize="small" className="ms-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isGeneratingSecret: state.auth.isGeneratingSecret,
    generateSecretSuccess: state.auth.generateSecretSuccess,
    generateSecretFailure: state.auth.generateSecretFailure,
    user: state.auth.user,
  };
};
export default connect(mapStateToProps)(ProfilePopover);
