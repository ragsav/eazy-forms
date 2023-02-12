import "./style.scss";
// import notFoundImage from "../../assets/not-found.png";
import notFoundImage from "../../assets/not-found.png";
import { useEffect } from "react";
export const Error404 = ({}) => {
  useEffect(() => {
    document.title = `404 page not found | Ezforms`;
  }, []);
  return (
    <div className="access-denied">
      <img
        src={notFoundImage}
        className="form-not-found-image"
        alt="not found"
      ></img>
      <span className="form-not-found-title">
        <span className="form-not-found-404 me-2">404</span>Page not found
      </span>
    </div>
  );
};
export default Error404;
