import "./style.scss";
import logo from "../../assets/logo-1-128.png";
import { Link } from "react-router-dom";
import ContactModal from "../contactModal/contactModal";
import { openGithubInNewTab } from "../../helpers/utils";
const Footer = ({}) => {
  return (
    <footer className="footer-main py-2 px-4">
      <ContactModal />
      <div className="w-100 d-flex flex-row justify-content-between align-items-center">
        <div className="d-flex flex-row align-items-center justify-content-start">
          <a className="footer-logo" href="/">
            <div className="d-flex flex-row align-items-center">
              <img src={logo} className="logo me-2" alt="Ezforms logo" />
              <span className="hide">Ezforms</span>
            </div>
          </a>
          
          <a href="https://github.com/ragsav/eazy-forms-frontend" className="ms-3" target="_blank">
            Github
          </a>
          <Link to="/docs" className="ms-3">
            Docs
          </Link>
          
        </div>

        <div className="d-flex flex-row justify-content-end align-items-center">
          <button
            className="primary-btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#contact-form-modal"
          >
            Contact us
          </button>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
