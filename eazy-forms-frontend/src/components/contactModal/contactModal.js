import CancelIcon from "@material-ui/icons/Cancel";
import "./style.scss";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import { notify } from "../notification";
import { CONSTANTS } from "../../constants";
require('dotenv').config()
const ContactModal = ({}) => {


  const [formState, setFormState] = useState({
    isSubmitting: false,
    submitionSuccess: false,
  });
  const handleContactForm = async (e) => {
    e.preventDefault();
    setFormState({ isSubmitting: true, submitionSuccess: false });
    const formData = {
      _secret: process.env.REACT_APP_CONTACT_FORM_SECRET,
      email: e.target[0].value,
      description: e.target[1].value,
      _response_type: "json",
    };
    const response = await axios.post(
      `${CONSTANTS.HOST}/api/submit/${process.env.REACT_APP_CONTACT_FORM_ID}`,
      { ...formData }
    );
    console.log(response);
    if (response && response.data && response.data.success === true) {
      setFormState({
        ...formState,
        submitionSuccess: true,
        isSubmitting: false,
      });
      notify("success", "Thank you for contacting");
    } else {
      setFormState({
        ...formState,
        submitionSuccess: false,
        isSubmitting: false,
      });
      notify("error", "Oops! Something went wrong");
    }
  };
  return (
    <div
      className="modal fade"
      id="contact-form-modal"
      tabIndex="-1"
      aria-labelledby="contact-form-modal"
      aria-hidden="true"
    >
      <div className="modal-dialog ">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title contact-form-modal-title">
              Contact form
            </h5>
            <button
              type="button"
              className="btn-close no-focus-outline-btn"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body contact-form-modal">
            <form onSubmit={handleContactForm}>
              <div className="mb-3">
                <label htmlFor="form-title" className="form-label fs-6">
                  Your email
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="form-title"
                  aria-describedby="title-help"
                  autoComplete="off"
                  placeholder="Email address"
                  name="email"
                  
                />
              </div>
              <div className="mb-3">
                <label htmlFor="form-title" className="form-label fs-6">
                  Description
                </label>
                <textarea
                  type="text"
                  rows={5}
                  className="form-control"
                  id="form-title"
                  aria-describedby="title-help"
                  autoComplete="off"
                  
                  name="description"
                  
                />
              </div>

              <button type="submit" className="primary-btn">
                {formState.isSubmitting ? (
                  <div className="d-flex flex-row align-items-center">
                    <CircularProgress size={16} color={"white"} />
                    <span className="ms-2">Submitting...</span>
                  </div>
                ) : formState.submitionSuccess ? (
                  "Thank you!"
                ) : (
                  "Contact us"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
