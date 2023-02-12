const express = require("express");
const crypto = require("crypto");

const router = express.Router();

const { submit } = require("../../controllers/exposed/submit.controller");
const { checkFormSubmit } = require("../../middlewares/check.middleware");

const routes = [router.post("/:fid", checkFormSubmit, submit)];

module.exports = routes;
