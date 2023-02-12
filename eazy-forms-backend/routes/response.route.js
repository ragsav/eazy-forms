const express = require("express");
const router = express.Router();

const { checkAuth } = require("../middlewares/check.middleware");
const {
  userProvider,
  formProvider,
} = require("../middlewares/provider.middleware");
const {
  getFormResponses,
  deleteFormResponse,
} = require("../controllers/response.controller");

const routes = [
  router.get("/:fid", checkAuth, userProvider, formProvider, getFormResponses),
  router.delete(
    "/:fid/:rid",
    checkAuth,
    userProvider,
    formProvider,
    deleteFormResponse
  ),
];

module.exports = routes;
