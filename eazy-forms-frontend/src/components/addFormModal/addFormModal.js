import { connect } from "react-redux";
import {
  addForm,
  loginUserWithGithub,
  loginUserWithGmail,
} from "../../redux/actions";
import CancelIcon from "@material-ui/icons/Cancel";
import "./style.scss";

import { CircularProgress } from "@material-ui/core";
import { useEffect } from "react";
const AddFormModal = ({
  isAddingForm,
  addFormSuccess,
  addFormFailure,
  dispatch,
}) => {
  const handleAddForm = ({ title,description }) => {
    dispatch(addForm({ title,description }));
  };

  return (
    <div
      className="modal fade"
      id="add-form-modal"
      tabIndex="-1"
      aria-labelledby="add-form-modal"
      aria-hidden="true"
    >
      <div className="modal-dialog ">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title add-form-modal-title">Add form</h5>
            <button
              type="button"
              className="btn-close no-focus-outline-btn"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body add-form-modal">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddForm({
                  title: e.target[0].value,
                  description: e.target[1].value,
                });
              }}
            >
              <div className="mb-3">
                <label htmlFor="form-title" className="form-label fs-6">
                  Form title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="form-title"
                  aria-describedby="title-help"
                  autoComplete="off"
                  placeholder="Enter a form title"
                  name="title"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="form-title" className="form-label fs-6">
                  Form description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="form-description"
                  aria-describedby="description-help"
                  autoComplete="off"
                  placeholder="Enter a form description"
                  name="description"
                />
              </div>
              

              <button type="submit" className="primary-btn mt-5">
                {isAddingForm ? (
                  <CircularProgress size={20} color={"white"} />
                ) : addFormSuccess ? (
                  "Form added"
                ) : addFormFailure ? (
                  "Oops! Form not added"
                ) : (
                  "Add form"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    isAddingForm: state.form.isAddingForm,
    addFormSuccess: state.form.addFormSuccess,
    addFormFailure: state.form.addFormFailure,
  };
}
export default connect(mapStateToProps)(AddFormModal);
