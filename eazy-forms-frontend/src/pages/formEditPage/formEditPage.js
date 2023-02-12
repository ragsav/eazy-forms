import { useEffect, useState } from "react";
import { useParams, useRouteMatch } from "react-router-dom";
import ActionBar from "../../components/actionBar/actionBar";
import { ResponseTabBar } from "../../components/responseTabBar/responseTabBar";
import slack_logo from "../../assets/slack.png";
import telegram_logo from "../../assets/telegram.png";
import { CONSTANTS } from "../../constants";
import "./style.scss";
import { connect } from "react-redux";
import {
  deleteForm,
  generateSecret,
  getFormById,
  updateForm,
} from "../../redux/actions";
import { CircularProgress } from "@material-ui/core";
import { FormLoading } from "../../components/formLoading/formLoading";
import { FormNotFound } from "../../components/formNotFound/formNotFound";
import { FileCopy } from "@material-ui/icons";
import { notify } from "../../components/notification";

const FormEditPage = ({
  isUpdatingForm,
  isDeletingForm,
  isGettingFormById,
  getFormByIdFailure,
  currentForm,
  isGeneratingSecret,
  updateFormType,
  dispatch,
}) => {
  const { fid } = useParams();
  const [secretVisible, setSecretVisible] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  useEffect(() => {
    if ((currentForm && fid && fid !== currentForm._id) || !currentForm) {
      dispatch(getFormById(fid));
    }
  }, [fid, currentForm]);

  useEffect(() => {
    if (fid) {
      document.title = `Edit | ${fid} | Ezforms`;
    }
  }, [fid]);

  useEffect(() => {
    if (currentForm) {
    }
  }, [currentForm]);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(currentForm?.secret);
    notify("info", "Secret copied to clipboard");
  };
  const handleUpdateForm = (e) => {
    e.preventDefault();

    const updatedForm = { _id: fid };
    updatedForm.title = e.target[0].value;
    updatedForm.description = e.target[1].value;
    updatedForm.is_active = e.target[2].checked;
    updatedForm.is_fav = e.target[3].checked;
    dispatch(updateForm(updatedForm, CONSTANTS.FORM_UPDATE_TYPE.INFO));
  };

  const handleUpdateTelegramWebhook = (e) => {
    e.preventDefault();
    const updatedForm = { _id: fid };
    updatedForm.telegram_token = e.target[0].value;
    updatedForm.telegram_chat_id = e.target[1].value;
    console.log({ updateFormTypeRaw: CONSTANTS.FORM_UPDATE_TYPE.TELEGRAM });
    dispatch(updateForm(updatedForm, CONSTANTS.FORM_UPDATE_TYPE.TELEGRAM));
  };

  const handleUpdateSlackWebhook = (e) => {
    e.preventDefault();
    const updatedForm = { _id: fid };
    updatedForm.slack_url = e.target[0].value;
    dispatch(updateForm(updatedForm, CONSTANTS.FORM_UPDATE_TYPE.SLACK));
  };

  const handleDeleteForm = (e) => {
    e.preventDefault();

    if (currentForm) {
      dispatch(deleteForm(currentForm._id));
    }
  };

  const handleGenerateSecret = (fid) => {
    dispatch(generateSecret(fid));
  };

  return (
    <div className="eazy-container form-main px-0 pb-5">
      <ActionBar
        form={currentForm}
        isLoading={isGettingFormById && !currentForm}
      />
      <ResponseTabBar
        fid={currentForm ? currentForm._id : null}
        formTab={CONSTANTS.FORM_TABS.EDIT.type}
      />
      {isGettingFormById && !currentForm ? (
        <FormLoading />
      ) : currentForm ? (
        <div className="eazy-container form-edit-layout">
          <div className="form-edit-container-1">
            <div className="form-title mt-3">
              <h6>Form secret</h6>
            </div>
            <div className="secret-display p-2 px-3">
              <span className="text-wrap w-100 text-break text-start mb-2 d-flex flex-row align-items-center">
                {currentForm?.secret}
                <FileCopy
                  style={{
                    color: "#614684",
                    cursor: "pointer",
                    marginLeft: "10px",
                    fontSize: "0.9rem",
                  }}
                  onClick={handleCopyToClipboard}
                ></FileCopy>
              </span>
              <div className="d-flex flex-row">
                <button
                  className="primary-btn-sm"
                  onClick={() => {
                    handleGenerateSecret(currentForm._id);
                  }}
                >
                  {isGeneratingSecret ? (
                    <div className="d-flex flex-row align-items-center">
                      <CircularProgress
                        style={{ color: "#9d80c3" }}
                        size={14}
                      />{" "}
                      <span className="ms-2">Generating new secret...</span>
                    </div>
                  ) : (
                    "Generate new secret"
                  )}
                </button>
              </div>
            </div>
            <div className="form-title mt-4">
              <h6>Form details edit</h6>
            </div>
            <form className="detail-edit-form p-3" onSubmit={handleUpdateForm}>
              <div className="mb-3">
                <label htmlFor="form-edit-title" className="form-label">
                  Form title
                </label>
                <input
                  type="text"
                  spellCheck="false"
                  className="form-control"
                  id="form-edit-title"
                  name="title"
                  defaultValue={currentForm.title}
                />
                <label htmlFor="form-edit-title" className="form-label">
                  Form description
                </label>
                <input
                  type="text"
                  spellCheck="false"
                  className="form-control"
                  id="form-edit-description"
                  name="description"
                  defaultValue={currentForm.description}
                />
              </div>

              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  spellCheck="false"
                  className="form-check-input"
                  name="is_active"
                  id="form-edit-active-checkbox"
                  defaultChecked={currentForm.is_active}
                />
                <label
                  className="form-check-label"
                  htmlFor="form-edit-active-checkbox"
                >
                  Form active
                </label>
              </div>
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  spellCheck="false"
                  className="form-check-input"
                  name="is_fav"
                  id="form-edit-fav-checkbox"
                  defaultChecked={currentForm.is_fav}
                />
                <label
                  className="form-check-label"
                  htmlFor="form-edit-fav-checkbox"
                >
                  Form favourite
                </label>
              </div>
              <button type="submit" className="primary-btn-sm">
                {isUpdatingForm &&
                updateFormType === CONSTANTS.FORM_UPDATE_TYPE.INFO ? (
                  <CircularProgress
                    style={{ color: "white" }}
                    size={15}
                    className="me-2"
                  />
                ) : null}
                {isUpdatingForm &&
                updateFormType === CONSTANTS.FORM_UPDATE_TYPE.INFO
                  ? "Updating form..."
                  : "Update form"}
              </button>
            </form>
            <div className="form-title mt-4">
              <h6>Webhook edit</h6>
              <span className="badge rounded-pill bg-dark ms-2 py-1 px-2">
                Telegram
              </span>
            </div>
            <form
              className="detail-edit-form p-3"
              onSubmit={handleUpdateTelegramWebhook}
            >
              <div className="webhook-logo-wrapper">
                <img
                  src={telegram_logo}
                  alt="telegram-logo"
                  className="telegram-logo"
                />
              </div>
              <label htmlFor="form-edit-telegram_token" className="form-label">
                Enter your telegram auth token for bot
              </label>
              <input
                // readOnly
                type="text"
                spellCheck="false"
                className="form-control"
                id="form-edit-telegram_token"
                name="telegram_token"
                placeholder="Enter telegram token"
                defaultValue={currentForm.telegram_token}
              />
              <label
                htmlFor="form-edit-telegram_chat_id"
                className="form-label mt-3"
              >
                Enter your telegram chat id
              </label>
              <input
                // readOnly
                type="text"
                spellCheck="false"
                className="form-control"
                id="form-edit-telegram_chat_id"
                name="telegram_chat_id"
                placeholder="Enter your chat id"
                defaultValue={currentForm.telegram_chat_id}
              />

              <button type="submit" className="primary-btn-sm mt-3">
                {isUpdatingForm &&
                updateFormType === CONSTANTS.FORM_UPDATE_TYPE.TELEGRAM ? (
                  <CircularProgress
                    style={{ color: "white" }}
                    size={15}
                    className="me-2"
                  />
                ) : null}
                {isUpdatingForm &&
                updateFormType === CONSTANTS.FORM_UPDATE_TYPE.TELEGRAM
                  ? "Updating telegram webhook..."
                  : "Update telegram webhook"}
              </button>
            </form>
            <div className="form-title mt-4">
              <h6>Webhook edit</h6>
              <span className="badge rounded-pill bg-dark ms-2 py-1 px-2">
                Slack
              </span>
            </div>
            <form
              className="detail-edit-form p-3"
              onSubmit={handleUpdateSlackWebhook}
            >
              <div className="webhook-logo-wrapper">
                <img src={slack_logo} alt="slack-logo" className="slack-logo" />
              </div>
              <label htmlFor="form-edit-slack-url" className="form-label">
                Enter your slack messaging url
              </label>
              <div className="w-100 d-flex flex-row justify-content-start align-items-center">
                <input
                  // readOnly
                  type="text"
                  className="form-control"
                  id="form-edit-slack-url"
                  name="slack_url"
                  defaultValue={currentForm.slack_url}
                />
              </div>

              <button type="submit" className="primary-btn-sm mt-3">
                {isUpdatingForm &&
                updateFormType === CONSTANTS.FORM_UPDATE_TYPE.SLACK ? (
                  <CircularProgress
                    style={{ color: "white" }}
                    size={15}
                    className="me-2"
                  />
                ) : null}
                {isUpdatingForm &&
                updateFormType === CONSTANTS.FORM_UPDATE_TYPE.SLACK
                  ? "Updating slack webhook..."
                  : "Update slack webhook"}
              </button>
            </form>

            <div className="form-title mt-4">
              <h5>Danger zone</h5>
            </div>

            <form className="deletion-form p-3" onSubmit={handleDeleteForm}>
              <div className="mb-3">
                <label
                  htmlFor="form-delete-title"
                  className="form-label d-flex flex-row"
                >
                  <span>Enter form title </span>
                  <span style={{ fontWeight: "600" }} className="form-title">
                    {currentForm.title}
                  </span>
                </label>
                <input
                  type="text"
                  spellCheck="false"
                  autoComplete="off"
                  className="form-control"
                  id="form-delete-title"
                  name="title"
                  onChange={(e) => {
                    if (currentForm && e.target.value === currentForm.title) {
                      setCanDelete(true);
                    }
                  }}
                />
              </div>

              <button
                type="submit"
                className="primary-btn-danger-sm"
                disabled={!canDelete}
              >
                {isDeletingForm ? (
                  <CircularProgress
                    style={{ color: "#ff5c5c" }}
                    size={15}
                    className="me-2"
                  />
                ) : null}
                {isDeletingForm ? "Deleting form..." : "Delete form"}
              </button>
            </form>
          </div>
        </div>
      ) : getFormByIdFailure ? (
        <FormNotFound />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isUpdatingForm: state.form.isUpdatingForm,
    isDeletingForm: state.form.isDeletingForm,
    updateFormType: state.form.updateFormType,
    deleteFormSuccess: state.form.deleteFormSuccess,
    isGettingFormById: state.form.isGettingFormById,
    getFormByIdSuccess: state.form.getFormByIdSuccess,
    getFormByIdFailure: state.form.getFormByIdFailure,
    isGeneratingSecret: state.form.isGeneratingSecret,

    currentForm: state.form.currentForm,
  };
};
export default connect(mapStateToProps)(FormEditPage);
