import { Link } from "react-router-dom";
import "./style.scss";
const SurveyFormSwitch = () => {
  return (
    <section class="seperator-wrapper ms-3">
      <div class="seperator gradient">
        <Link to={"/survey"}>Surveys</Link>
      </div>
    </section>
  );
};
export default SurveyFormSwitch;
