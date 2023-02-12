import { CircularProgress } from "@material-ui/core";
import "./style.scss";
export const FormLoading = ({}) => {
  return (
    <div className="eazy-container d-flex flex-column justify-content-center align-items-center h-100 mt-5">
      <CircularProgress size={20} style={{ color: "#9d80c3" }} />
    </div>
  );
};
