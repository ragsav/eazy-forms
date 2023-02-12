import "./style.scss";
import hero from "../../assets/hero.PNG";
import { Link } from "react-router-dom";
import SyntaxHighLighter from "react-syntax-highlighter";
import {
  dracula,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { CONSTANTS } from "../../constants";
import { useEffect } from "react";
const Home = () => {
  useEffect(()=>{
    document.title = `Ezforms | Simple form server | Handle your form responses`
  },[])
  return (
    <div className="home-main pb-5">
      <div className="home-header">
        <div className="eazy-container mt-5">
          <h1>You design the forms, we handle the responses</h1>

          <h6>
            No need to maintain a server for your forms now, just use our
            endpoint in your form action and get all your responses in your
            dashboard
          </h6>
          <img src={hero} className="mt-4 mb-5 hero-img" />
          
        </div>
        
      </div>
      
      
      <div className="eazy-container mt-5 d-flex flex-row justify-content-center mt-5 mb-4">
        <div>
          <button
            className="primary-btn mx-2 p-2"
            data-bs-toggle="modal"
            data-bs-target="#auth-modal"
          >
            Get started
          </button>
        </div>

        <Link to={"/docs"} className="primary-outline-btn mx-2">
          Docs
        </Link>
      </div>
      <div className="eazy-container mt-5">
        
        <h4 className="w-100 text-start text-with-underline">Simple example</h4>
        <p className="mt-4 text-start">
          Set your form's action-attribute to our server url with your form_id.
          Add a field named <code className="highlight">"_secret"</code> to
          identify that response is coming from your trusted source. If this
          field is present or the value is not the same as provided, Ezforms
          will reject the submission & mark it as spam. The input should be
          hidden.
        </p>
        <div className="home-example-1">
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
              marginBottom:0
            }}
          >
            {`<form id="form_id" action="${CONSTANTS.HOST}/api/submit/form_id" method="POST" >
    <input name="_secret" type="hidden" value="your_secret" >
    <input name="name" type="text" id="name" >
    <input name="email" type="email" id="email" >
    <input value="Submit" type="submit" >
</form>`}
          </SyntaxHighLighter>
        
        
        
        
        </div>
      
        <p className="mt-4 text-start">
          {`If you want you can also send the form data in the body of
            `}
          <code className="highlight">
            {`${CONSTANTS.HOST}/api/submit/{form_id}`}.
          </code>
          
        </p>
        
      </div>
      
      
      <div className="home-steps py-3 mt-5">
        <div className="eazy-container">

          <h4 className="w-100 text-start text-with-underline">Use cases</h4>
          <div className="use-case-container mt-3 pt-4">
            <div className="step">
              {/* <img src={number1} alt="step 1" /> */}
              <h5>Contact forms</h5>
              <p>
                Easily create contact forms on your product landing page.
              </p>
            </div>
            <div className="step">
              {/* <img src={number2} alt="step 2" /> */}
              <h5>Conduct surveys</h5>
              <p>
                Conduct surveys on your website or app. Easily filter the spams
              </p>
            </div>
            <div className="step">
              {/* <img src={number3} alt="step 3" /> */}
              <h5 >Delivery website</h5>
              <p>
                Make a full fledged food delivery website with Ezforms.Easily manage forms on your food delivery website.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="home-steps py-3 mt-3">
        <div className="eazy-container">

          <h4 className="w-100 text-start text-with-underline">How it works</h4>
          <div className="steps-container mt-3 pt-4">
            <div className="step">
              {/* <img src={number1} alt="step 1" /> */}
              <h5>1. Sign in</h5>
              <p>
                First step is to sign in. Its simple and free. Sign is required
                in order to verify user. This gives a unique secret token for
                each form you create which will be used to protect from spams.
              </p>
            </div>
            <div className="step">
              {/* <img src={number2} alt="step 2" /> */}
              <h5>2. Create form</h5>
              <p>
                Second step is to create a new form. Just add a title to create
                a new form. Further you can edit the form title and also the
                form status either active or inactive. After a form is generated
                a unique id is provided for each form which is used while
                integrating the endpoint.
              </p>
            </div>
            <div className="step">
              {/* <img src={number3} alt="step 3" /> */}
              <h5 >3. Integrate and ready!!!</h5>
              <p>
                The final step is to integrate the endpoint in your form's{" "}
                <b>action</b> attribute. You can view the integration guide and
                these <a href="/docs">examples</a>. And you are done. As soon as
                the form is live, you can see the responses in response section
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
