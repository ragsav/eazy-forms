import "./style.scss";
import ActionBar from "../../components/actionBar/actionBar";
import FormList from "../../components/formList/formList";
import { useEffect } from "react";
const Dashboard = () => {
  useEffect(() => {
    document.title = `Dashboard | Ezforms`;
  }, []);
  return (
    <div className="eazy-container dashboard-main p-0 pb-5">
      <ActionBar />
      <FormList />
    </div>
  );
};
export default Dashboard;
