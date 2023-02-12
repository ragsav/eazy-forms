import { useEffect } from "react";
import SyntaxHighLighter from "react-syntax-highlighter";
import {
  dracula,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { CONSTANTS } from "../../constants";

const Docs = ({}) => {
  useEffect(()=>{
    document.title = "Docs | Ezforms"
  },[])
  return (
    <div className="form-main">
      <div className="eazy-container text-start mt-3 integration-main">
        <h6>Simple example</h6>
        <p>
          Set your form's action-attribute to our server url with your form_id.
          Add a field named <code className="highlight">"_secret"</code> to
          identify that response is coming from your trusted source. If this
          field is present or the value is not the same as provided, Ezforms
          will reject the submission & mark it as spam. The input should be
          hidden.
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
            // border: "1px solid #dddddd",
            // background: "rgb(226,226,226)",
            // background:
            //   "linear-gradient(0deg, rgb(245, 245, 245) 0%, rgba(247,248,251,1) 31%, rgba(247,248,251,1) 100%)",
          }}
        >
          {`<form id="form_id" action="${CONSTANTS.HOST}/api/submit/form_id" method="POST" >
    <input name="_secret" type="hidden" value="your_secret" >
    <input name="name" type="text" id="name" >
    <input name="email" type="email" id="email" >
    <input value="Submit" type="submit" >
</form>`}
        </SyntaxHighLighter>
        <h6 className="mt-4">Example with custom redirect</h6>
        <p>
          If you want you can also add a custom redirect url to your form in the{" "}
          <code className="highlight">"_redirect"</code> field which will also
          be hidden and the value will contain your url. After the successfull
          submission user will be redirected to this url
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
            // border: "1px solid #dddddd",
            // background: "rgb(226,226,226)",
            // background:
            //   "linear-gradient(0deg, rgb(245, 245, 245) 0%, rgba(247,248,251,1) 31%, rgba(247,248,251,1) 100%)",
          }}
        >
          {`<form id="form_id" action="${CONSTANTS.HOST}/api/submit/form_id" method="POST">
    <input name="_redirect" type="hidden" value="https://your website url" >
    <input name="_secret" type="hidden" value="your_secret" >
    <input name="name" type="text" id="name" >
    <input name="email" type="email" id="email" >    
    <input value="Submit" type="submit" >
</form>`}
        </SyntaxHighLighter>
        <p className="mt-4">
          {`If you want you can also send the form data in the body of
            `}
          <code className="highlight">
            {`${CONSTANTS.HOST}/api/submit/form_id`}.
          </code>
          {`Make sure to convert your response to string in case you are applying the rules`}
        </p>
      </div>
    </div>
  );
};

export default Docs;
