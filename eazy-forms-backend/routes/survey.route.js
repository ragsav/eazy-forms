const express = require("express");
const crypto = require("crypto");
const router = express.Router();

const { checkAuth } = require("../middlewares/check.middleware");
const {
  userProvider,
  formProvider,
  surveyProvider,
} = require("../middlewares/provider.middleware");
const {
  addSurvey,
  updateSurvey,
  deleteSurvey,
  getAllSurveys,
  getSurveyById,
} = require("../controllers/survey.controller");
// const {
//   formCreationValidation,
//   formUpdationValidation,
// } = require("../middlewares/validation.middleware");
const routes = [
  router.post("/add", checkAuth, userProvider, addSurvey),
  router.post("/update", checkAuth, userProvider, surveyProvider, updateSurvey),
  router.get("/all", checkAuth, userProvider, getAllSurveys),
  router.get("/get/:sid", checkAuth, userProvider, formProvider, getSurveyById),
];

module.exports = routes;
