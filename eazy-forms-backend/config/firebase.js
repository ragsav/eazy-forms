require("dotenv").config();
const admin = require("firebase-admin");
const serviceAccount = require("../firebase-key.json");


const configureFirebase = () =>{
  //initialise firebase admin sdk
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

module.exports = {configureFirebase}
