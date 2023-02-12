import "./style.scss";
// import notFoundImage from "../../assets/not-found.png";
import notFoundImage from "../../assets/forbidden2.png";
import { useEffect } from "react";
export const AccessDenied = ({}) => {
  useEffect(() => {
    document.title = `Access denied | Ezforms`;
  }, []);
  return (
    <div className="access-denied">
      <img
        src={notFoundImage}
        className="form-not-found-image"
        alt="not found"
      ></img>
      <span className="form-not-found-title">
        <span className="form-not-found-404 me-2">403</span>Access denied
      </span>
    </div>
  );
};
export default AccessDenied;
