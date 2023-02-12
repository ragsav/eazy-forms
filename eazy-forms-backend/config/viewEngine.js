const express = require("express");
const configureViewEngine = (app) =>{
    app.set('view engine', 'ejs'); 
    app.use(express.static(__dirname + "/public"));
    
    
}
module.exports = {configureViewEngine};