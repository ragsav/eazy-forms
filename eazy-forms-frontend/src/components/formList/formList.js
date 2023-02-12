import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAllForms } from "../../redux/actions";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import DescriptionIcon from "@material-ui/icons/Description";
import SearchIcon from "@material-ui/icons/Search";
import EditIcon from "@material-ui/icons/Edit";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import LensIcon from "@material-ui/icons/Lens";
import "./style.scss";
import { mongoDBDateStringToReadable } from "../../helpers/dateTime";
import { Link } from "react-router-dom";
import { CONSTANTS } from "../../constants";
import { Empty } from "../empty/empty";
import { Grid } from "@material-ui/core";
import SurveyFormSwitch from "../surveyFormSwitch/surveyFormSwitch";
const FormList = ({ allForms, dispatch }) => {
  const [query, setQuery] = useState("");
  useEffect(() => {
    dispatch(getAllForms());
  }, []);

  const handleFormSearch = (e) => {
    e.preventDefault();
    dispatch(getAllForms(query));
  };
  return (
    <div className="h-100 w-100">
      <div className="eazy-container mb-3 mt-3 d-flex flex-row justify-content-between">
        {/* <div className="form-survey-switch-tab">
          <Link className="left-tab active-tab" to={"/"}>
            Forms
          </Link>
          <Link className="right-tab" to={"/survey"}>
            Surveys
          </Link>
        </div> */}
        {/* <SurveyFormSwitch /> */}
        <form
          className="form-list-search-bar "
          onSubmit={(e) => {
            handleFormSearch(e);
          }}
        >
          <input
            type="text"
            spellCheck="false"
            className="form-control mr-2"
            id="search-form"
            aria-describedby="Search form"
            placeholder="Filter forms"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            name="search"
          />
          <button
            type="submit"
            className="primary-btn ms-2"
            aria-label="search form button"
          >
            <SearchIcon style={{ fontSize: "0.9 rem" }} />
          </button>
        </form>
      </div>
      {allForms && allForms.length > 0 ? (
        <div className="eazy-list-container">
          <Grid container className="form-list  mt-5">
            {allForms.map((form, formIndex) => {
              return (
                <Grid
                  item
                  key={formIndex}
                  className="form-list-item-container"
                  md={4}
                  sm={6}
                  xs={12}
                  style={{ height: "100%" }}
                >
                  <Link
                    className="eazy-container form-list-item form-list-item-link p-0"
                    to={CONSTANTS.ROUTES.FORM_RESPONSE.route(form._id)}
                  >
                    <div className="form-list-item-body d-flex flex-column justify-content-start align-items-start">
                      <div className="form-list-item-header">
                        <div
                          className={
                            form.is_active
                              ? "active form-list-item-title w-100"
                              : "inactive form-list-item-title w-100"
                          }
                        >
                          <div className="d-flex flex-row">
                            {form.is_active ? (
                              <DescriptionIcon />
                            ) : (
                              <InsertDriveFileIcon />
                            )}
                            {/* {form.is_fav ? (
                          <div>
                            <StarIcon className="star ms-2" fontSize="small" />
                          </div>
                        ) : (
                          <div>
                            <StarBorderIcon className="ms-2" fontSize="small" />
                          </div>
                        )} */}
                            <span className="px-2 text-start">
                              {form.title}
                            </span>
                          </div>
                        </div>
                        <div
                          className={form.is_active ? "active" : "inactive"}
                        ></div>

                        <div className="d-flex flex-row justify-content-start align-items-center">
                          <span className="form-list-item-count-response mt-1 ms-1">
                            {`${form.response} response | ${form.spam} spam`}
                          </span>
                        </div>
                      </div>

                      <span className="form-list-item-description py-1 mt-1">
                        {form.description}
                      </span>
                    </div>

                    <div className="form-list-item-footer d-flex flex-row justify-content-start align-items-center">
                      <span className="badge rounded-pill bg-active-info form-list-item-link">
                        <LensIcon
                          style={{
                            fontSize: "1.3em",
                            marginRight: 5,
                            color: form.is_active ? "green" : "#d18c8c",
                          }}
                        />
                        {form.is_active ? "Active" : "Inactive"}
                      </span>
                      <span className="form-list-item-date ms-2">
                        {mongoDBDateStringToReadable(form.createdAt)}
                      </span>
                    </div>
                  </Link>
                </Grid>
              );
            })}
          </Grid>
        </div>
      ) : (
        <div className="eazy-list-container">
          <Empty title={"No forms found"} />
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    allForms: state.form.allForms,
  };
};
export default connect(mapStateToProps)(FormList);
