import "./style.scss";
import notFoundImage from "../../assets/not-found.png";

export const FormNotFound = ({ title }) => {
  return (
    <div className="mt-3 w-100 d-flex flex-column justify-content-start align-items-center">
      <img
        src={notFoundImage}
        className="form-not-found-image"
        alt="not found"
      ></img>
      <span className="form-not-found-title">
        {title ? title : "Form not found"}
      </span>
    </div>
  );
};
