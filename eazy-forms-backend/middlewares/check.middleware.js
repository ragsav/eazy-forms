const admin = require("firebase-admin");
const formSchema = require("../models/form/formSchema");
const userSchema = require("../models/user/userSchema");

const checkAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.replace("Bearer ", "");
    admin
      .auth()
      .verifyIdToken(token)
      .then((decodedToken) => {
        console.log({user_logging_in:decodedToken});
        req.body.firebase_id = decodedToken.uid;
        req.body.firebase_user = decodedToken;
        next();
      })
      .catch((error) => {
        console.log({ error });
        return res.status(401).json({ success: false, error });
      });
  }
};

const checkFormSubmit = async (req, res, next) => {
  try {
    const { fid } = req.params;
    const { _secret } = req.body;
    console.log({ fid });
    if (!fid) {
      return res.status(404).json({
        success: false,
        error: { message: "Provide form id in the url params" },
      });
    } else {
      const formData = await formSchema.findById(fid);
      if(!formData){
        return res.status(404).json({
          success: false,
          error: { message: "Form not found" },
        });
      }
      else if (!formData.is_active) {
        return res.status(403).json({
          success: false,
          error: { message: "Form no longer accepting response" },
        });
      } else if (!_secret || formData.secret.localeCompare(_secret) !== 0) {
        req.body.provider_form = formData._doc;
        req.body.is_spam = true;
        next();
      } else {
        req.body.provider_form = formData._doc;
        next();
      }
    }
  } catch (error) {
    console.log({ error });
    return res.status(404).json({
      success: false,
      error: { message: "Form not found" },
    });
  }
};

const checkSecret = async (req, res, next) => {
  try {
    console.log("check secret")
    const { fid ,secret} = req.params;
    if (!fid) {
      return res.status(400).json({
        success: false,
        error: { message: "Form id not found in the url" },
      });
    } else {
      const formData = await formSchema.findById(fid);
      if(!secret || formData.secret.localeCompare(secret) !== 0){
        return res.status(400).json({
          success: false,
          error: { message: "Provided secret is either wrong or expired" },
        });
      }
      else {
        req.body.provider_form = formData._doc;
        next();
      }
    }
  } catch (error) {
    console.log({ error });
    return res.status(404).json({
      success: false,
      error: { message: "Form not found. Form id is invalid" },
    });
  }
};

module.exports = {
  checkAuth,
  checkFormSubmit,
  checkSecret
};
