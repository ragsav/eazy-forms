import { CircularProgress } from "@material-ui/core";
import "./style.scss";
export const Loading = () => {
  return (
    <div className="loading-main">
      <CircularProgress size={30} style={{ color: "#614684" }} />
    </div>
  );
};
