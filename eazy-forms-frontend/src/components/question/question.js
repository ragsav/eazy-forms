import "./style.scss";
import Switch from "@material-ui/core/Switch";
import { useEffect, useState } from "react";
import {
  Done,
  Cancel,
  Close,
  DeleteOutline,
  FileCopyOutlined,
  ErrorOutline,
} from "@material-ui/icons";
const ErrorBanner = ({ error }) => {
  return (
    <div className="w-100 px-3 pt-2">
      <div className="error-banner-main p-1">
        <ErrorOutline style={{ color: "#fc5050" }} />
        <span className="ms-2">{error}</span>
      </div>
    </div>
  );
};
const AddOptions = ({ index, options, handleQuestionOptionsChanges }) => {
  const [newOption, setNewOption] = useState("");
  const handleAddNewOption = (e) => {
    e.preventDefault();
    options = [...options, newOption];
    setNewOption("");
    handleQuestionOptionsChanges(options);
  };
  const handleOptionEdit = (optionIndex, v) => {
    const newOptions = [...options];
    newOptions[optionIndex] = v;
    handleQuestionOptionsChanges(newOptions);
  };
  const handleDeleteOption = (optionIndex) => {
    const newOptions = [...options];
    newOptions.splice(optionIndex, 1);
    handleQuestionOptionsChanges(newOptions);
  };
  return (
    <div className="options-container p-3 pt-1">
      {options?.length > 0
        ? options.map((option, optionIndex) => {
            return (
              <div className="d-flex flex-row justify-content-start align-items-center mt-1">
                <input
                  className="option-input-control"
                  value={option}
                  onChange={(e) => {
                    handleOptionEdit(optionIndex, e.target.value);
                  }}
                  key={`question-${index}-option-${option - index}`}
                />
                <button
                  className="primary-icon-btn ms-2"
                  onClick={() => {
                    handleDeleteOption(optionIndex);
                  }}
                >
                  <Close />
                </button>
              </div>
            );
          })
        : null}
      <form
        className=" d-flex flex-row justify-content-start align-items-center mt-2"
        onSubmit={handleAddNewOption}
      >
        <input
          className="form-control add-new-option"
          placeholder="Add new option"
          value={newOption}
          onChange={(e) => {
            setNewOption(e.target.value);
          }}
        />
        <button className="primary-outline-btn-sm ms-2">Add</button>
      </form>
    </div>
  );
};
const LinearScale = ({
  minRange,
  maxRange,
  handleQuestionMinMaxRangeChanges,
  index,
}) => {
  const clear = () => {
    handleQuestionMinMaxRangeChanges(0, "");
    handleQuestionMinMaxRangeChanges(1, "");
  };
  return (
    <div className="min-max-container p-3 pt-1">
      <div className="d-flex flex-row justify-content-start align-items-start">
        <div className="d-flex flex-column justify-content-start align-items-start me-3">
          <label
            htmlFor={`question-${index}-min-range`}
            className="form-label mb-1"
          >
            Min range
          </label>
          <input
            id={`question-${index}-min-range`}
            type="number"
            className="form-control"
            value={minRange}
            onChange={(e) => {
              handleQuestionMinMaxRangeChanges(0, e.target.value);
            }}
          />
        </div>
        <div className="d-flex flex-column justify-content-start align-items-start">
          <label
            htmlFor={`question-${index}-max-range`}
            className="form-label mb-1"
          >
            Max range
          </label>
          <input
            id={`question-${index}-max-range`}
            type="number"
            className="form-control"
            value={maxRange}
            onChange={(e) => {
              handleQuestionMinMaxRangeChanges(1, e.target.value);
            }}
          />
        </div>
      </div>

      <button className="primary-outline-btn-danger" onClick={clear}>
        Clear constraints
      </button>
    </div>
  );
};

const LongAnswer = ({
  minLength,
  maxLength,
  handleQuestionMinMaxLengthChanges,
  index,
}) => {
  const clear = () => {
    handleQuestionMinMaxLengthChanges(0, "");
    handleQuestionMinMaxLengthChanges(1, "");
  };
  return (
    <div className="min-max-container p-3 pt-1">
      <div className="d-flex flex-row justify-content-start align-items-start">
        <div className="d-flex flex-column justify-content-start align-items-start me-3">
          <label
            htmlFor={`question-${index}-min-length`}
            className="form-label mb-1"
          >
            Min length
          </label>
          <input
            id={`question-${index}-min-length`}
            type="number"
            className="form-control"
            value={minLength}
            onChange={(e) => {
              handleQuestionMinMaxLengthChanges(0, e.target.value);
            }}
            min={0}
          />
        </div>
        <div className="d-flex flex-column justify-content-start align-items-start">
          <label
            htmlFor={`question-${index}-max-length`}
            className="form-label mb-1"
          >
            Max length
          </label>
          <input
            id={`question-${index}-max-length`}
            type="number"
            className="form-control"
            value={maxLength}
            onChange={(e) => {
              handleQuestionMinMaxLengthChanges(1, e.target.value);
            }}
            min={0}
          />
        </div>
      </div>

      <button className="primary-outline-btn-danger" onClick={clear}>
        Clear constraints
      </button>
    </div>
  );
};

const CheckboxAnswer = ({
  minSelect,
  maxSelect,
  handleQuestionMinMaxSelectChanges,
  index,
}) => {
  const clear = () => {
    handleQuestionMinMaxSelectChanges(0, "");
    handleQuestionMinMaxSelectChanges(1, "");
  };
  useEffect(() => {
    console.log({ minSelect, maxSelect });
  }, [minSelect, maxSelect]);
  return (
    <div className="min-max-container p-3 pt-1">
      <div className="d-flex flex-row justify-content-start align-items-start">
        <div className="d-flex flex-column justify-content-start align-items-start me-3">
          <label
            htmlFor={`question-${index}-min-select`}
            className="form-label mb-1"
          >
            Min select
          </label>
          <input
            id={`question-${index}-min-length`}
            type="number"
            className="form-control"
            value={minSelect}
            onChange={(e) => {
              handleQuestionMinMaxSelectChanges(0, e.target.value);
            }}
            min={0}
          />
        </div>
        <div className="d-flex flex-column justify-content-start align-items-start">
          <label
            htmlFor={`question-${index}-max-select`}
            className="form-label mb-1"
          >
            Max select
          </label>
          <input
            id={`question-${index}-max-select`}
            type="number"
            className="form-control"
            value={maxSelect}
            onChange={(e) => {
              handleQuestionMinMaxSelectChanges(1, e.target.value);
            }}
            min={0}
          />
        </div>
      </div>

      <button className="primary-outline-btn-danger" onClick={clear}>
        Clear constraints
      </button>
    </div>
  );
};

const Time = ({ minTime, maxTime, handleQuestionMinMaxTimeChanges, index }) => {
  const clear = () => {
    handleQuestionMinMaxTimeChanges(0, "");
    handleQuestionMinMaxTimeChanges(1, "");
  };
  return (
    <div className="min-max-container p-3 pt-1">
      <div className="d-flex flex-row justify-content-start align-items-start">
        <div className="d-flex flex-column justify-content-start align-items-start me-3">
          <label
            htmlFor={`question-${index}-min-time`}
            className="form-label mb-1"
          >
            Min time
          </label>
          <input
            id={`question-${index}-min-time`}
            type="time"
            className="form-control"
            value={minTime}
            onChange={(e) => {
              handleQuestionMinMaxTimeChanges(0, e.target.value);
            }}
          />
        </div>
        <div className="d-flex flex-column justify-content-start align-items-start">
          <label
            htmlFor={`question-${index}-max-time`}
            className="form-label mb-1"
          >
            Max time
          </label>
          <input
            id={`question-${index}-min-time`}
            type="time"
            className="form-control"
            value={maxTime}
            onChange={(e) => {
              handleQuestionMinMaxTimeChanges(1, e.target.value);
            }}
          />
        </div>
      </div>

      <button className="primary-outline-btn-danger" onClick={clear}>
        Clear constraints
      </button>
    </div>
  );
};

const Date = ({ minDate, maxDate, handleQuestionMinMaxDateChanges, index }) => {
  const clear = () => {
    handleQuestionMinMaxDateChanges(0, "");
    handleQuestionMinMaxDateChanges(1, "");
  };
  return (
    <div className="min-max-container p-3 pt-1">
      <div className="d-flex flex-row justify-content-start align-items-start">
        <div className="d-flex flex-column justify-content-start align-items-start me-3">
          <label
            htmlFor={`question-${index}-min-date`}
            className="form-label mb-1"
          >
            Min date
          </label>
          <input
            id={`question-${index}-min-date`}
            type="date"
            className="form-control"
            value={minDate}
            onChange={(e) => {
              handleQuestionMinMaxDateChanges(0, e.target.value);
            }}
          />
        </div>
        <div className="d-flex flex-column justify-content-start align-items-start">
          <label
            htmlFor={`question-${index}-max-date`}
            className="form-label mb-1"
          >
            Max date
          </label>
          <input
            id={`question-${index}-max-date`}
            type="date"
            className="form-control"
            value={maxDate}
            onChange={(e) => {
              handleQuestionMinMaxDateChanges(1, e.target.value);
            }}
          />
        </div>
      </div>

      <button className="primary-outline-btn-danger" onClick={clear}>
        Clear constraints
      </button>
    </div>
  );
};

const Question = ({
  index,
  question,
  handleQuestionChanges,
  handleDeleteQuestion,
  handleDuplicateQuestion,
  error,
}) => {
  const questionTypes = [
    "short_answer",
    "long_answer",
    "multiple_choice",
    "check_box",
    "drop_down",
    "linear_scale",
    "date",
    "time",
  ];
  const questionTypeMap = {
    short_answer: "Short answer",
    long_answer: "Long answer",
    multiple_choice: "Multiple choice",
    check_box: "Checkbox",
    drop_down: "Dropdown",
    linear_scale: "Linear scale",
    date: "Date",
    time: "Time",
  };
  const handleQuestionOptionsChanges = (options) => {
    question.options = options;
    handleQuestionChanges(question, index);
  };
  const handleQuestionTitleChange = (e) => {
    question.title = e.target.value;
    handleQuestionChanges(question, index);
  };
  const handleQuestionTypeChange = (e) => {
    question.type = e.target.value;
    handleQuestionChanges(question, index);
  };
  const handleQuestionIsRequired = (e) => {
    question.isRequired = e.target.checked;
    handleQuestionChanges(question, index);
  };
  const handleQuestionMinMaxLengthChanges = (t, v) => {
    if (t === 0) {
      question.minLength = v;
    } else {
      question.maxLength = v;
    }
    handleQuestionChanges(question, index);
  };
  const handleQuestionMinMaxSelectChanges = (t, v) => {
    if (t === 0) {
      question.minSelect = v;
    } else {
      question.maxSelect = v;
    }
    handleQuestionChanges(question, index);
  };
  const handleQuestionMinMaxRangeChanges = (t, v) => {
    if (t === 0) {
      question.minRange = v;
    } else {
      question.maxRange = v;
    }
    handleQuestionChanges(question, index);
  };
  const handleQuestionMinMaxTimeChanges = (t, v) => {
    if (t === 0) {
      question.minTime = v;
    } else {
      question.maxTime = v;
    }
    handleQuestionChanges(question, index);
  };
  const handleQuestionMinMaxDateChanges = (t, v) => {
    if (t === 0) {
      question.minDate = v;
    } else {
      question.maxDate = v;
    }
    handleQuestionChanges(question, index);
  };

  return (
    <div className={"question-container"}>
      {error ? <ErrorBanner error={error} /> : null}
      <div className="d-flex flex-row p-3">
        <input
          className="form-control w-75 me-2"
          placeholder="Untitled question"
          onChange={handleQuestionTitleChange}
          value={question.title}
        />
        <select
          class="form-select w-25"
          aria-label=".form-select-lg example"
          onChange={handleQuestionTypeChange}
          value={question.type}
          //   defaultValue={question.type}
        >
          {questionTypes.map((type, index) => {
            return (
              <option
                key={`question-${index}-type-${index}`}
                value={type.toString()}
              >
                {questionTypeMap[type.toString()]}
              </option>
            );
          })}
        </select>
      </div>
      {question.type === "long_answer" ? (
        <LongAnswer
          index={index}
          minLength={question.minLength}
          maxLength={question.maxLength}
          handleQuestionMinMaxLengthChanges={handleQuestionMinMaxLengthChanges}
        />
      ) : null}

      {question.type === "multiple_choice" ||
      question.type === "check_box" ||
      question.type === "drop_down" ? (
        <AddOptions
          index={index}
          options={question.options}
          handleQuestionOptionsChanges={handleQuestionOptionsChanges}
        />
      ) : null}
      {question.type === "check_box" ? (
        <CheckboxAnswer
          index={index}
          minSelect={question.minSelect}
          maxSelect={question.maxSelect}
          handleQuestionMinMaxSelectChanges={handleQuestionMinMaxSelectChanges}
        />
      ) : null}
      {question.type === "linear_scale" ? (
        <LinearScale
          index={index}
          minRange={question.minRange}
          maxRange={question.maxRange}
          handleQuestionMinMaxRangeChanges={handleQuestionMinMaxRangeChanges}
        />
      ) : null}
      {question.type === "date" ? (
        <Date
          index={index}
          minDate={question.minDate}
          maxDate={question.maxDate}
          handleQuestionMinMaxDateChanges={handleQuestionMinMaxDateChanges}
        />
      ) : null}
      {question.type === "time" ? (
        <Time
          index={index}
          minTime={question.minTime}
          maxTime={question.maxTime}
          handleQuestionMinMaxTimeChanges={handleQuestionMinMaxTimeChanges}
        />
      ) : null}
      <div className="question-footer">
        <div className="footer-left px-3">
          <button
            className="primary-icon-btn"
            onClick={() => {
              handleDuplicateQuestion(index);
            }}
          >
            <FileCopyOutlined style={{ fontSize: "1.28rem" }} />
          </button>
        </div>

        <div className="footer-right px-3 py-2">
          <span className="me-1">Required</span>
          <Switch
            onChange={handleQuestionIsRequired}
            checked={question.isRequired ? question.isRequired : false}
            size="small"
            color="primary"
          />
          <button
            className="primary-icon-btn"
            onClick={() => {
              handleDeleteQuestion(index);
            }}
          >
            <DeleteOutline style={{ color: "#d58b8b" }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Question;
