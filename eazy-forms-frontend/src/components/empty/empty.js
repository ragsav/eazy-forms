import "./style.scss";
import emptyImage from "../../assets/empty1.png";

export const Empty = ({ title }) => {
  return (
    <div className="mt-5 d-flex flex-column justify-content-start align-items-center">
      <img src={emptyImage} className="empty-image" alt="empty image"></img>
      <span className="empty-title">{title}</span>
    </div>
  );
};
