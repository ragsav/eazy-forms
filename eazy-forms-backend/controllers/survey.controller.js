const admin = require("firebase-admin");
const CONSTANTS = require("../constants");
const formSchema = require("../models/form/formSchema");
const responseSchema = require("../models/response/responseSchema");
const userSchema = require("../models/user/userSchema");
const crypto = require("crypto");
const surveySchema = require("../models/survey/surveySchema");
const addSurvey = async (req, res) => {
  console.log({ req });
  try {
    const { firebase_id, firebase_user, survey, provider_user } = req.body;
    const uid = provider_user._id;
    const allUserForms = await formSchema.find({ uid });
    if (allUserForms.length > 10) {
    } else {
      const newForm = new formSchema({
        uid,
        title: survey.title,
        description: survey.description,
        secret: crypto.randomBytes(24).toString("hex"),
      });
      const formSave = await newForm.save();
      const newSurvey = new surveySchema({
        fid: formSave._id,
        questions: survey.questions,
      });
      await newSurvey.save();
      return res.status(200).json({ success: true, survey: newSurvey });
    }
  } catch (error) {
    console.log({ error });
    return res.status(400).json({ success: false, error });
  }
};

const deleteSurvey = async (req, res) => {
  try {
    const { provider_survey } = req.body;
    await formSchema.findByIdAndDelete(provider_survey.fid);
    await surveySchema.findByIdAndDelete(provider_survey._id);
    await responseSchema.deleteMany({ fid: provider_survey.fid });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log({ error });
    return res.status(400).json({ success: false, error });
  }
};

const updateSurvey = async (req, res) => {
  try {
    const { firebase_id, firebase_user, form, provider_survey, provider_user } =
      req.body;
    const { rules, ...updatedForm } = form;
    const formSave = await formSchema.findByIdAndUpdate(provider_survey.fid, {
      title: provider_survey.title,
      description: provider_survey.description,
    });
    const surveySave = await surveySchema.findByIdAndUpdate(
      provider_survey._id,
      {
        questions: provider_survey.questions,
      }
    );
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log({ error });
    return res.status(400).json({ success: false, error });
  }
};

const getAllSurveys = async (req, res) => {
  try {
    const { firebase_id, firebase_user, provider_user } = req.body;
    let { query } = req.query;
    if (!query) {
      query = "";
    }
    console.log(new RegExp(query));
    const uid = provider_user._id;
    const formsData = await formSchema
      .find({
        uid,
        title: { $regex: new RegExp(query) },
      })
      .sort({ createdAt: -1 });

    const finalForms = [];
    const formIds = [];
    formsData.forEach((form) => {
      finalForms.push({
        ...form._doc,
        spam: 0,
        response: 0,
      });
      formIds.push(form._id);
    });
    const allSurveys = await surveySchema.find({ fid: { $in: formIds } });
    finalForms.forEach((form) => {
      for (var i = 0; i < allSurveys.length; i++) {
        if (
          allSurveys[i]._id.toString().localeCompare(form._id.toString()) === 0
        ) {
          allSurveys[i].form = form;
        }
      }
    });
    return res.status(200).json({ success: true, allSurveys: allSurveys });
  } catch (error) {
    console.log({ error });
    return res.status(400).json({ success: false, error });
  }
};

const getSurveyById = async (req, res) => {
  try {
    const { provider_survey } = req.body;
    return res.status(200).json({ success: true, survey: provider_survey });
  } catch (error) {
    return res.status(400).json({ success: false, error });
  }
};
module.exports = {
  addSurvey,
  deleteSurvey,
  getAllSurveys,
  updateSurvey,
  getSurveyById,
};
