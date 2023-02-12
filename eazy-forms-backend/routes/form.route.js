const express = require("express");
const crypto = require("crypto");
const router = express.Router();

const { checkAuth } = require("../middlewares/check.middleware");
const {
  userProvider,
  formProvider,
} = require("../middlewares/provider.middleware");
const {
  addForm,
  getAllForms,
  getFormResponses,
  getFormById,
  deleteForm,
  deleteFormResponse,
  updateFormInfo,
  updateFormSecret,
} = require("../controllers/form.controller");
const {
  formCreationValidation,
  formUpdationValidation,
} = require("../middlewares/validation.middleware");
const routes = [
  router.post("/add", checkAuth, userProvider, formCreationValidation, addForm),
  router.post(
    "/update-info",
    checkAuth,
    userProvider,
    formUpdationValidation,
    formProvider,
    updateFormInfo
  ),
  router.post(
    "/update-secret",
    checkAuth,
    userProvider,
    formProvider,
    updateFormSecret
  ),
  router.post("/delete", checkAuth, userProvider, formProvider, deleteForm),
  router.get("/all", checkAuth, userProvider, getAllForms),

  router.get("/get/:fid", checkAuth, userProvider, formProvider, getFormById),
];

module.exports = routes;
