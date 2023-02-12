import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "./config/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./global-scss-constants.scss";
import "./components/popConfirm/style.css";
const store = configureStore();
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
        <ToastContainer />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

