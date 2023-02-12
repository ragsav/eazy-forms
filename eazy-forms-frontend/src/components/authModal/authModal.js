import { connect } from "react-redux";
import { loginUserWithGmail } from "../../redux/actions";
import "./style.scss";
import logo from "../../assets/logo-1-128.png";
import bg from "../../assets/auth-modal.svg";
import GoogleSignInButton from "../googleSignInButton/googleSignInButton";
const AuthModal = ({ dispatch }) => {
  return (
    <div
      className="modal fade"
      id="auth-modal"
      tabIndex="-1"
      aria-labelledby="auth-modal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content auth-modal-content">
          
          <div className="modal-body auth-modal-body">
            <button
              type="button"
              className="btn-close no-focus-outline-btn auth-modal-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
            <div className="left p-3">
              <div className="d-flex flex-row align-items-center nav-logo-modal mb-4">
                <img src={logo} className="logo me-2" alt="Ezforms logo" />
                <span className="hide">Ezforms</span>
              </div>
              {/* <h5 className="mt-3 label">Sign in to your account</h5> */}
              {/* <GoogleButton
                type="light"
                onClick={}
              /> */}
              <GoogleSignInButton onClick={() => {
                  dispatch(loginUserWithGmail());
                }}/>
              <div className="description mt-3 mb-3">
                We allow only trusted third party sign in order to prevent
                the platform from bots
              </div>
            </div>
            <div className="right p-5">
              <img src={bg}></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    isVerifyingUser: state.auth.isVerifyingUser,
    verifyUserSuccess: state.auth.verifyUserSuccess,
  };
}
export default connect(mapStateToProps)(AuthModal);
