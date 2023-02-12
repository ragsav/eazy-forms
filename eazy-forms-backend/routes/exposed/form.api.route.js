const express = require("express");
const crypto = require("crypto");
const router = express.Router();

const {
  checkSecret
} = require("../../middlewares/check.middleware");
const {
  getFormResponses,getFormById, getResponseById
} = require("../../controllers/exposed/form.api.controller");

const routes = [
  router.get(
    "/:secret/:fid",
    checkSecret,
    getFormById
  ),
  router.get(
    "/:secret/:fid/responses",
    checkSecret,
    getFormResponses
  ),
  router.get(
    "/:secret/:fid/responses/:rid",
    checkSecret,
    getResponseById
  ),
];

module.exports = routes;
