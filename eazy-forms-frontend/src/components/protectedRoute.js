import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { CONSTANTS } from "../constants";
import { Loading } from "./loading/loading";
const ProtectedRoute = ({
  successComponent: SuccessComponent,
  fallbackComponent: FallbackComponent,
  loadingComponent : LoadingComponent,
  isVerifyingUser,
  verifyUserSuccess,
  exact,
  path,
}) => {
  return (
    <Route
      exact={exact}
      path={path}
      render={() =>
        isVerifyingUser ? (
          <LoadingComponent/>
        ) : verifyUserSuccess ? (
          <SuccessComponent />
        ) : (
          <FallbackComponent />
        )
      }
    />
  );
};
function mapStateToProps(state) {
  return {
    isVerifyingUser: state.auth.isVerifyingUser,
    verifyUserSuccess: state.auth.verifyUserSuccess,
  };
}
export default connect(mapStateToProps)(ProtectedRoute);
