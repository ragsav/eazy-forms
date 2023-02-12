const express = require("express");
const crypto = require("crypto");
const router = express.Router();

const { getSelf, generateSecret } = require("../controllers/user.controller");

const { checkAuth } = require("../middlewares/check.middleware");
const { userProvider } = require("../middlewares/provider.middleware");

const routes = [
  router.get("/self", checkAuth, getSelf),
  // router.get("/generate-secret", checkAuth, userProvider, generateSecret),
];

module.exports = routes;
