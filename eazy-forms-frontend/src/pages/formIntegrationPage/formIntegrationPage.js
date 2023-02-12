import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ActionBar from "../../components/actionBar/actionBar";
import { ResponseTabBar } from "../../components/responseTabBar/responseTabBar";
import { CONSTANTS } from "../../constants";
import "./style.scss";
import { connect } from "react-redux";
import { FormLoading } from "../../components/formLoading/formLoading";
import { FormNotFound } from "../../components/formNotFound/formNotFound";
import SyntaxHighLighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { getFormById } from "../../redux/actions";

const FormIntegrationPage = ({
  isGettingFormById,
  getFormByIdFailure,
  currentForm,
  user,
  dispatch,
}) => {
  const { fid } = useParams();
  useEffect(() => {
    if (fid) {
      document.title = `Integration steps | ${fid} | Ezforms`;
    }
  }, [fid]);
  useEffect(() => {
    if ((currentForm && fid && fid !== currentForm._id) || !currentForm) {
      dispatch(getFormById(fid));
    }
  }, [fid, currentForm]);
  return (
    <div className="eazy-container form-main p-0 pb-5">
      <ActionBar
        form={currentForm}
        isLoading={isGettingFormById && !currentForm}
      />
      <ResponseTabBar
        fid={currentForm ? currentForm._id : null}
        formTab={CONSTANTS.FORM_TABS.INTEGRATION.type}
      />
      {isGettingFormById && !currentForm ? (
        <FormLoading />
      ) : currentForm && user ? (
        <div className="eazy-container text-start mt-3 integration-main">
          <h6>Your Credentials</h6>

          <SyntaxHighLighter
            lineProps={{
              style: {
                wordBreak: "break-all",
                whiteSpace: "pre-wrap",
              },
            }}
            wrapLines={true}
            language="json"
            style={dracula}
            showLineNumbers
            customStyle={{
              borderRadius: 4,
              textAlign: "start",
            }}
          >
            {`{
  "form_id":"${currentForm._id}",
  "_secret":"${currentForm.secret}"
}`}
          </SyntaxHighLighter>
          <h6>Simple example</h6>
          <p>
            Set your form's action-attribute to our server url with your
            email.Add a field named <code className="highlight">"_secret"</code>{" "}
            to identify that response is comming from your trusted source. If
            this field is present or the value is not the same as provided,
            Ezforms will reject the submission. The input should be hidden.
          </p>
          <SyntaxHighLighter
            lineProps={{
              style: {
                wordBreak: "break-all",
                whiteSpace: "pre-wrap",
              },
            }}
            wrapLines={true}
            language="htmlbars"
            style={dracula}
            showLineNumbers
            customStyle={{
              borderRadius: 4,
              textAlign: "start",
            }}
          >
            {`<form id="form_id" action="${CONSTANTS.HOST}/api/submit/${currentForm._id}" method="POST" >
    <input name="_secret" type="hidden" value="${currentForm.secret}" >
    <input name="name" type="text" id="name" >
    <input name="email" type="email" id="email" >
    <input value="Submit" type="submit" >
</form>`}
          </SyntaxHighLighter>
        </div>
      ) : getFormByIdFailure ? (
        <FormNotFound />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isGettingFormById: state.form.isGettingFormById,
    getFormByIdSuccess: state.form.getFormByIdSuccess,
    getFormByIdFailure: state.form.getFormByIdFailure,
    currentForm: state.form.currentForm,
    user: state.auth.user,
  };
};
export default connect(mapStateToProps)(FormIntegrationPage);
