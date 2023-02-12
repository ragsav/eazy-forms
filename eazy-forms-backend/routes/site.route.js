const express = require("express");
const crypto = require("crypto");
const router = express.Router();

const routes = [
  // router.get("/",(req,res)=>{
  //   return res.status(200).render("home")
  // }),
  router.get("/",(req,res)=>{
    return res.status(403).render("api-access-error-page")
  }),
  // router.get("/_raghav",(req,res)=>{
  //   return res.status(200).render("home")
  // }),
];

module.exports = routes;
