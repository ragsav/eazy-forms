import { useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { CONSTANTS } from "../../constants";
import "./style.scss";
export const ResponseTabBar = ({ fid, formTab }) => {
  return (
    <nav className="response-tab-bar-main">
      <div className="eazy-container response-tab d-flex flex-row justify-content-start align-items-center w-100">
        <Link
          to={CONSTANTS.ROUTES.FORM_INTEGRATION.route(fid)}
          className={
            formTab === CONSTANTS.FORM_TABS.INTEGRATION.type
              ? "response-tab-bar-link-active"
              : "response-tab-bar-link-inactive"
          }
        >
          {CONSTANTS.FORM_TABS.INTEGRATION.name}
        </Link>
        <Link
          to={CONSTANTS.ROUTES.FORM_RESPONSE.route(fid)}
          className={
            formTab === CONSTANTS.FORM_TABS.RESPONSE.type
              ? "response-tab-bar-link-active"
              : "response-tab-bar-link-inactive"
          }
        >
          {CONSTANTS.FORM_TABS.RESPONSE.name}
        </Link>
        <Link
          to={CONSTANTS.ROUTES.FORM_SPAM.route(fid)}
          className={
            formTab === CONSTANTS.FORM_TABS.SPAM.type
              ? "response-tab-bar-link-active"
              : "response-tab-bar-link-inactive"
          }
        >
          {CONSTANTS.FORM_TABS.SPAM.name}
        </Link>
        <Link
          to={CONSTANTS.ROUTES.FORM_EDIT.route(fid)}
          className={
            formTab === CONSTANTS.FORM_TABS.EDIT.type
              ? "response-tab-bar-link-active"
              : "response-tab-bar-link-inactive"
          }
        >
          {CONSTANTS.FORM_TABS.EDIT.name}
        </Link>
        <Link
          to={CONSTANTS.ROUTES.SURVEY_BUILDER.route(fid)}
          className={
            formTab === CONSTANTS.FORM_TABS.SURVEY.type
              ? "response-tab-bar-link-active"
              : "response-tab-bar-link-inactive"
          }
        >
          {CONSTANTS.FORM_TABS.SURVEY.name}
        </Link>
        {/* <Link
          to={CONSTANTS.ROUTES.FORM_RULES.route(fid)}
          className={
            formTab === CONSTANTS.FORM_TABS.RULES.type
              ? "response-tab-bar-link-active"
              : "response-tab-bar-link-inactive"
          }
        >
          {CONSTANTS.FORM_TABS.RULES.name}
          <span className="badge rounded-pill bg-warning text-dark ms-2">
            Beta
          </span>
        </Link> */}
      </div>
    </nav>
  );
};
