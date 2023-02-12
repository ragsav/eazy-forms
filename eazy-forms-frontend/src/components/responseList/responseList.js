import { connect } from "react-redux";
import "./style.scss";
import SearchIcon from "@material-ui/icons/Search";
import { CONSTANTS } from "../../constants";
import { useState } from "react";
import ReactJson from "react-json-view";
import { mongoDBDateStringToReadable } from "../../helpers/dateTime";
import { deleteResponse, getFormResponses } from "../../redux/actions";
import { CircularProgress } from "@material-ui/core";
import { Empty } from "../empty/empty";
import { confirmAlert } from "../popConfirm";
import { DeleteOutline, RefreshRounded } from "@material-ui/icons";
const ResponseList = ({
  currentForm,
  dispatch,
  isGettingFormResponses,
  user,
  spam,
}) => {
  const [query, setQuery] = useState("");
  const [selectedSortType, setSelectedSortType] = useState(
    CONSTANTS.RESPONSE_SORT_FILTER.SORT_TYPE.SUBMITTED_AT.type
  );
  const [selectedSortOrder, setSelectedSortOrder] = useState(
    CONSTANTS.RESPONSE_SORT_FILTER.SORT_ORDER.DESC.type
  );

  const [isResponseCollapsed, setIsResponseCollapsed] = useState(true);

  const handleSearch = () => {
    if (currentForm) {
      dispatch(
        getFormResponses(currentForm._id, {
          sortType:
            CONSTANTS.RESPONSE_SORT_FILTER.SORT_TYPE[selectedSortType].value,
          sortOrder:
            CONSTANTS.RESPONSE_SORT_FILTER.SORT_ORDER[selectedSortOrder].value,
          query,
        })
      );
    }
  };
  const handleSortTypeChange = (type) => {
    setSelectedSortType(type);
    handleSearch();
  };
  const handleSortOrderChange = (type) => {
    setSelectedSortOrder(type);
    handleSearch();
  };
  const handleChangeResponseCollapse = (e) => {
    setIsResponseCollapsed(e);
  };

  const handleDeleteResponse = (rid) => {
    confirmAlert({
      title: "Confirm delete this response?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(
              deleteResponse(rid, currentForm._id, {
                sortType:
                  CONSTANTS.RESPONSE_SORT_FILTER.SORT_TYPE[selectedSortType]
                    .value,
                sortOrder:
                  CONSTANTS.RESPONSE_SORT_FILTER.SORT_ORDER[selectedSortOrder]
                    .value,
                query,
              })
            );
          },
        },
        {
          label: "No",
          // onClick: () => alert("Click No"),
        },
      ],
    });
  };
  return (
    <div className="d-flex flex-column justify-content-start align-items-center w-100">
      <div className="eazy-container mb-3 mt-3 d-flex flex-row justify-content-between">
        <form
          className="response-list-search-bar "
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <input
            type="text"
            className="form-control mr-2"
            placeholder="name:vineet,value:3"
            autoComplete="off"
            value={query}
            spellCheck="false"
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            name="query"
          />
          <button
            type="submit"
            aria-label="search response button"
            className="primary-btn mx-2"
            disabled={isGettingFormResponses}
          >
            {isGettingFormResponses ? (
              <CircularProgress style={{ color: "white" }} size={24} />
            ) : (
              <SearchIcon />
            )}
          </button>
        </form>
      </div>
      <div className=" eazy-container mb-3 d-flex flex-row justify-content-start">
        <div className="d-flex flex-row justify-content-end align-items-center">
          <button
            className="primary-outline-btn-sm refresh-btn me-2"
            onClick={() => {
              window.location.reload();
            }}
          >
            {"Refresh"}
          </button>
          <div className="btn-group">
            <button
              className="primary-outline-btn-sm dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              id="sort-select-dropdown"
            >
              {CONSTANTS.RESPONSE_SORT_FILTER.SORT_TYPE[selectedSortType].name}
            </button>
            <ul
              className="dropdown-menu"
              aria-labelledby="sort-select-dropdown"
            >
              {Object.keys(CONSTANTS.RESPONSE_SORT_FILTER.SORT_TYPE).map(
                (sType, sTypeIndex) => {
                  return (
                    <li key={sTypeIndex}>
                      <div
                        className="dropdown-item"
                        onClick={() => {
                          handleSortTypeChange(
                            CONSTANTS.RESPONSE_SORT_FILTER.SORT_TYPE[sType].type
                          );
                        }}
                      >
                        {CONSTANTS.RESPONSE_SORT_FILTER.SORT_TYPE[sType].name}
                      </div>
                    </li>
                  );
                }
              )}
            </ul>
          </div>
          <div className="btn-group ms-2">
            <button
              className="primary-outline-btn-sm dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              id="sort-select-dropdown"
            >
              {
                CONSTANTS.RESPONSE_SORT_FILTER.SORT_ORDER[selectedSortOrder]
                  .name
              }
            </button>
            <ul
              className="dropdown-menu"
              aria-labelledby="sort-select-dropdown"
            >
              {Object.keys(CONSTANTS.RESPONSE_SORT_FILTER.SORT_ORDER).map(
                (sOrder, sOrderIndex) => {
                  return (
                    <li key={sOrderIndex}>
                      <div
                        className="dropdown-item"
                        onClick={() => {
                          handleSortOrderChange(
                            CONSTANTS.RESPONSE_SORT_FILTER.SORT_ORDER[sOrder]
                              .type
                          );
                        }}
                      >
                        {CONSTANTS.RESPONSE_SORT_FILTER.SORT_ORDER[sOrder].name}
                      </div>
                    </li>
                  );
                }
              )}
            </ul>
          </div>
        </div>
        <div className="d-flex flex-row justify-content-start align-items-center ms-3">
          <input
            type="checkbox"
            className="form-check-input m-0"
            id="response-collapse"
            onChange={(e) => {
              handleChangeResponseCollapse(e.target.checked);
            }}
            defaultChecked={isResponseCollapsed}
          />
          <label
            className="form-check-label m-0 ms-2 r-tag "
            htmlFor="response-collapse"
          >
            Collapse all responses
          </label>
        </div>
      </div>

      {currentForm &&
      currentForm.responses &&
      currentForm.responses.length > 0 ? (
        <ul className="w-100 responses-ul">
          {currentForm.responses.map((response, responseIndex) => {
            return (spam && response.is_spam) ||
              (!spam && !response.is_spam) ? (
              <li className="response-main py-2" key={responseIndex}>
                <div className="eazy-container response-container">
                  <div className="response-list-item-left">
                    <span className="r-tag">{`Response id`}</span>
                    <span className="id">{response._id}</span>
                    <span className="r-tag mt-2">{`Recieved at`}</span>
                    <span
                      style={{ color: "#736882" }}
                    >{`${mongoDBDateStringToReadable(response.createdAt)}  (${
                      response.createdAt
                    })`}</span>
                    <button
                      className="primary-outline-btn-danger-sm mt-2"
                      onClick={() => {
                        handleDeleteResponse(response._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                  <div className="response-list-item-mid">
                    {response?.response ? (
                      <div className="response-display">
                        <ReactJson
                          name="response"
                          src={response.response}
                          // theme="monokai"
                          style={{ width: "100%" }}
                          collapsed={isResponseCollapsed}
                          displayDataTypes={false}
                        />
                      </div>
                    ) : (
                      <span style={{ color: "#736882" }}>Empty response</span>
                    )}
                  </div>
                </div>
              </li>
            ) : null;
          })}
        </ul>
      ) : (
        <Empty title={spam ? "No spams yet" : "No responses yet"} />
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    isGettingFormResponses: state.form.isGettingFormResponses,
    getFormResponsesSuccess: state.form.getFormResponsesSuccess,
    getFormResponsesFailure: state.form.getFormResponsesFailure,
    currentForm: state.form.currentForm,
    user: state.auth.user,
  };
};
export default connect(mapStateToProps)(ResponseList);
