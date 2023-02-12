import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ActionBar from "../../components/actionBar/actionBar";
import { ResponseTabBar } from "../../components/responseTabBar/responseTabBar";

import { CONSTANTS } from "../../constants";
import "./style.scss";
import { connect } from "react-redux";
import { getFormById, getFormResponses } from "../../redux/actions";
import { FormLoading } from "../../components/formLoading/formLoading";
import { FormNotFound } from "../../components/formNotFound/formNotFound";
import ResponseList from "../../components/responseList/responseList";
const FormResponsePage = ({
  isGettingFormById,
  getFormByIdFailure,
  currentForm,
  dispatch,
}) => {
  const { fid } = useParams();
  useEffect(() => {
    if (fid) {
      document.title = `Responses | ${fid} | Ezforms`;
    }
  }, [fid]);
  useEffect(() => {
    if ((currentForm && fid && fid !== currentForm._id) || !currentForm) {
      dispatch(getFormById(fid));
      dispatch(getFormResponses(fid));
    } else if (currentForm && !currentForm.responses) {
      dispatch(getFormResponses(fid));
    }
  }, [fid, currentForm]);

  useEffect(() => {}, [currentForm]);

  return (
    <div className="eazy-container form-main p-0 pb-5">
      <ActionBar
        form={currentForm}
        isLoading={isGettingFormById && !currentForm}
      />
      <ResponseTabBar
        fid={currentForm ? currentForm._id : null}
        formTab={CONSTANTS.FORM_TABS.RESPONSE.type}
      />
      {isGettingFormById && !currentForm ? (
        <FormLoading />
      ) : currentForm && currentForm.responses ? (
        <ResponseList spam={false} />
      ) : getFormByIdFailure ? (
        <FormNotFound />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isUpdatingForm: state.form.isUpdatingForm,
    updateFormType: state.form.updateFormType,
    isGettingFormById: state.form.isGettingFormById,
    getFormByIdSuccess: state.form.getFormByIdSuccess,
    getFormByIdFailure: state.form.getFormByIdFailure,
    isGettingFormResponses: state.form.isGettingFormResponses,
    getFormResponsesSuccess: state.form.getFormResponsesSuccess,
    getFormResponsesFailure: state.form.getFormResponsesFailure,
    currentForm: state.form.currentForm,
  };
};
export default connect(mapStateToProps)(FormResponsePage);
