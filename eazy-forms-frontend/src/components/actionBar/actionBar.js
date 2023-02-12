import { connect } from "react-redux";
import { resetAddFormState, updateForm } from "../../redux/actions";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import StarIcon from "@material-ui/icons/Star";
import Add from "@material-ui/icons/Add";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import "./style.scss";
import LensIcon from "@material-ui/icons/Lens";

import { Link } from "react-router-dom";
import { CONSTANTS } from "../../constants";
import { CircularProgress } from "@material-ui/core";
const ActionBar = ({ form, dispatch, isLoading }) => {
  const handleResetAddFormState = () => {
    dispatch(resetAddFormState());
  };
  return (
    <div className="app-bar-main py-3">
      <div className="eazy-container d-flex flex-column">
        <div className=" app-bar-container">
          <div className="d-flex flex-column align-items-start justify-content-start">
            {!form ? null : isLoading ? (
              <div className="app-bar-form-path">
                <CircularProgress size={20} style={{ color: "#9d80c3" }} />
              </div>
            ) : form ? (
              <div className="app-bar-form-path">
                <Link to={CONSTANTS.ROUTES.DASHBOARD.route}>
                  <span className="pe-2 ps-1 py-1 hide name">My forms</span>
                </Link>
                <ArrowForwardIosIcon
                  fontSize="small"
                  className="form-icon hide"
                />
                <Link to={CONSTANTS.ROUTES.FORM_RESPONSE.route(form._id)}>
                  <span className="app-bar-form-name">{form.title}</span>
                </Link>
                {/* <span className="badge rounded-pill bg-active-info form-list-item-link mx-2 me-2 ">
                  <LensIcon
                    style={{
                      fontSize: "1.3em",
                      marginRight: 5,
                      color: form?.is_active ? "green" : "#d18c8c",
                      // marginTop: 4,
                    }}
                  />
                  {form?.is_active ? "Active" : "Inactive"}
                </span> */}
                {/* {form.is_fav ? (
                  <StarIcon
                    className="star ms-2"
                    style={{ fontSize: "1.4em", marginBottom: 2 }}
                  />
                ) : (
                  <StarBorderIcon
                    className="ms-2"
                    style={{ fontSize: "1.4em", marginBottom: 2 }}
                  />
                )} */}
              </div>
            ) : null}
          </div>

          {/* <button
            className="primary-btn-sm p-1 px-2 d-flex flex-row justify-content-start align-items-center"
            data-bs-toggle="modal"
            data-bs-target="#add-form-modal"
            onClick={handleResetAddFormState}
          >
            <Add />
            <span>New form</span>
          </button> */}
        </div>
        {/* {form&&form.description?<span className="form-description mt-2">{form.description}</span>:null} */}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {};
};
export default connect(mapStateToProps)(ActionBar);
