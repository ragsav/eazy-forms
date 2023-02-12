const formSchema = require("../models/form/formSchema");
const surveySchema = require("../models/survey/surveySchema");
const userSchema = require("../models/user/userSchema");

const userProvider = async (req, res, next) => {
  try {
    const { firebase_id } = req.body;
    const userData = await userSchema.findOne({ firebase_id });
    if (!userData) {
      return res.send({
        success: false,
        error: { message: "Not an user" },
      });
    } else {
      req.body.provider_user = userData._doc;
      next();
    }
  } catch (error) {
    return res.send({ success: false, error });
  }
};

const formProvider = async (req, res, next) => {
  try {
    const { provider_user } = req.body;
    let { fid } = req.params;
    if (!fid) {
      fid = req.body.fid;
    }
    if (!fid && req.body.form) {
      fid = req.body.form._id;
    }
    if (!fid) {
      return res.send({
        success: false,
        error: { message: "Form Id not found" },
      });
    }
    const formData = await formSchema.findOne({
      _id: fid,
      uid: provider_user._id,
    });
    if (formData) {
      req.body.provider_form = formData._doc;
      next();
    } else {
      return res.send({
        success: false,
        error: { message: "Form does not belong to user" },
      });
    }
  } catch (error) {
    res.send({ success: false, error });
  }
};
const surveyProvider = async (req, res, next) => {
  try {
    const { provider_user } = req.body;
    const allUserForms = await formSchema.find({ uid: provider_user.uid });
    const formIds = [];
    allUserForms.forEach((form) => {
      formIds.push(form._id);
    });
    let { sid } = req.params;
    if (!sid) {
      sid = req.body.sid;
    }
    if (!sid && req.body.survey) {
      sid = req.body.survey._id;
    }
    if (!sid) {
      return res.send({
        success: false,
        error: { message: "Survey Id not found" },
      });
    }
    const surveyData = await surveySchema.findOne({
      _id: sid,
      fid: { $in: formIds },
    });
    if (surveyData) {
      req.body.provider_survey = surveyData._doc;
      next();
    } else {
      return res.send({
        success: false,
        error: { message: "Survey does not belong to user" },
      });
    }
  } catch (error) {
    res.send({ success: false, error });
  }
};

module.exports = { userProvider, formProvider, surveyProvider };
