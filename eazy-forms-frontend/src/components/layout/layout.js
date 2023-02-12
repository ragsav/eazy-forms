import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";
import "./style.scss";
const AppLayout = ({ children }) => {
  return (
    <div className="app-layout-main">
      <div className="w-100 h-100 d-flex flex-column justify-content-start">
        <Navbar />
        {children}
      </div>

      <Footer />
    </div>
  );
};
export default AppLayout;
