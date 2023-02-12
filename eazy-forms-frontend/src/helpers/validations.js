import validator from "validator";
export const validateSurveyBuilder = (questions) => {
  //   const questions = [
  //     new QuestionClass({ id: "1" }),
  //     new QuestionClass({ id: "2" }),
  //     new QuestionClass({ id: "3" }),
  //   ];
  const errors = new Array(questions.length);
  questions.forEach((question, index) => {
    try {
      console.log(new Date(question.maxTime));
      console.log({ e: question.maxDate });
      // validation for title
      if (validator.isEmpty(question.title)) {
        errors[index] = "Question title cannot be empty";
      }
      //validation for linear scale
      else if (
        !validator.isEmpty(question.maxRange) &&
        !validator.isEmpty(question.minRange)
      ) {
        if (parseInt(question.maxRange) <= parseInt(question.minRange)) {
          errors[index] = "Max range cannot be less than or equal to min range";
        }
      }
      //validation for date
      else if (
        !validator.isEmpty(question.maxDate) &&
        !validator.isEmpty(question.minDate)
      ) {
        if (
          !validator.isDate(question.maxDate) ||
          !validator.isDate(question.minDate)
        ) {
          errors[index] = "Invalid date values";
        } else if (new Date(question.maxDate) <= new Date(question.minDate)) {
          errors[index] = "Max date cannot be less than or equal to min date";
        }
      }

      //validation for date
      else if (
        !validator.isEmpty(question.maxTime) &&
        !validator.isEmpty(question.minTime)
      ) {
        console.log(new Date(question.maxTime));
        if (
          !validator.isDate(question.maxTime) ||
          !validator.isDate(question.minTime)
        ) {
          errors[index] = "Invalid date values";
        } else if (new Date(question.maxTime) <= new Date(question.minTime)) {
          errors[index] = "Max date cannot be less than or equal to min time";
        }
      }
    } catch (error) {
      errors[index] = error.toString();
    }
  });
  let isError = false;
  errors.forEach((error) => {
    console.log({ error });
    if (error) isError = true;
  });
  return isError ? errors : null;
};
