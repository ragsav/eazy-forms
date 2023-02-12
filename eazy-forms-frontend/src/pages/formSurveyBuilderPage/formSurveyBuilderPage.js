import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./style.scss";
import { Link, useParams } from "react-router-dom";
import Question from "../../components/question/question";
import ReactJson from "react-json-view";
import { v4 as uuid } from "uuid";
import { validateSurveyBuilder } from "../../helpers/validations";
import { addSurvey, getFormById, updateForm } from "../../redux/actions";
import { CONSTANTS } from "../../constants";
import ActionBar from "../../components/actionBar/actionBar";
import { ResponseTabBar } from "../../components/responseTabBar/responseTabBar";
export class QuestionClass {
  constructor({
    id,
    title,
    description,
    type,
    isRequired,
    options,
    maxTime,
    minTime,
    maxRange,
    minRange,
    maxLength,
    minLength,
    maxSelect,
    minSelect,
    maxDate,
    minDate,
  }) {
    this.id = id;
    this.title = title ? title : "";
    this.description = description ? description : "";
    this.type = type ? type : "";
    this.isRequired = isRequired ? isRequired : false;
    this.options = options ? options : [];
    this.maxTime = maxTime ? maxTime : "";
    this.minTime = minTime ? minTime : "";
    this.maxRange = maxRange ? maxRange : "";
    this.minRange = minRange ? minRange : "";
    this.maxLength = maxLength ? maxLength : "";
    this.minLength = minLength ? minLength : "";
    this.maxSelect = maxSelect ? maxSelect : "";
    this.minSelect = minSelect ? minSelect : "";
    this.maxDate = maxDate ? maxDate : "";
    this.minDate = minDate ? minDate : "";
  }
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const FormSurveyBuilderPage = ({
  dispatch,
  currentForm,
  isGettingFormById,
}) => {
  const [questions, setQuestions] = useState([]);
  const [errors, setErrors] = useState(null);
  const { fid } = useParams();

  useEffect(() => {
    if (fid) {
      document.title = `Survey builder | ${fid} | Ezforms`;
    }
  }, [fid]);

  useEffect(() => {
    if ((currentForm && fid && fid !== currentForm._id) || !currentForm) {
      dispatch(getFormById(fid));
    } else if (currentForm && fid && fid === currentForm._id) {
      setQuestions(currentForm.questions ? currentForm.questions : []);
    }
  }, [fid, currentForm]);

  const handleQuestionChanges = (question, index) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...question };
    setQuestions(newQuestions);
  };
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newOrderedQuestions = reorder(
      questions,
      result.source.index,
      result.destination.index
    );
    setErrors(null);
    setQuestions([...newOrderedQuestions]);
  };
  const handleAddNewQuestion = () => {
    setQuestions(
      questions.concat([new QuestionClass({ id: `question-id-${uuid()}` })])
    );
    console.log({ questions });
  };
  const handleDeleteQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };
  const handleDuplicateQuestion = (index) => {
    const q = { ...questions[index] };
    q.id = `question-id-${uuid()}`;
    const newQuestions = [...questions];
    newQuestions.splice(index, 0, q);
    setQuestions(newQuestions);
  };
  const handleUpdateForm = (e) => {
    e.preventDefault();
    const err = validateSurveyBuilder(questions);
    setErrors(err);
    if (err && err.length > 0) return;
    const updatedForm = { _id: fid };
    updatedForm.questions = questions;
    dispatch(updateForm(updatedForm, CONSTANTS.FORM_UPDATE_TYPE.INFO));
  };
  return (
    <div className="eazy-container builder-main p-0">
      <ActionBar
        form={currentForm}
        isLoading={isGettingFormById && !currentForm}
      />
      <ResponseTabBar
        fid={currentForm ? currentForm._id : null}
        formTab={CONSTANTS.FORM_TABS.SURVEY.type}
      />
      <button
        onClick={handleAddNewQuestion}
        className="add-question-button py-3 px-4 mt-4"
      >
        <span>Add question</span>
      </button>

      <div class="survey-builder-main">
        <div className="builder-content-main">
          <section className="content-page">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {questions.map((question, index) => {
                      return (
                        <Draggable
                          key={question.id}
                          draggableId={question.id}
                          index={index}
                          on
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                width: "100%",
                                padding: 2,
                                background: "transparent",
                                marginBottom: 20,
                                ...provided.draggableProps.style,
                              }}
                            >
                              <Question
                                index={index}
                                question={question}
                                error={errors ? errors[index] : null}
                                handleQuestionChanges={handleQuestionChanges}
                                handleDeleteQuestion={handleDeleteQuestion}
                                handleDuplicateQuestion={
                                  handleDuplicateQuestion
                                }
                              />
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </section>
        </div>
      </div>
      <button onClick={handleUpdateForm} className="primary-btn mb-3">
        Update form
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isUpdatingForm: state.form.isUpdatingForm,
    updateFormType: state.form.updateFormType,
    isGettingFormById: state.form.isGettingFormById,
    getFormByIdSuccess: state.form.getFormByIdSuccess,
    getFormByIdFailure: state.form.getFormByIdFailure,
    isGettingFormResponses: state.form.isGettingFormResponses,
    getFormResponsesSuccess: state.form.getFormResponsesSuccess,
    getFormResponsesFailure: state.form.getFormResponsesFailure,
    currentForm: state.form.currentForm,
  };
};
export default connect(mapStateToProps)(FormSurveyBuilderPage);
