const admin = require("firebase-admin");
const CONSTANTS = require("../constants");
const formSchema = require("../models/form/formSchema");
const responseSchema = require("../models/response/responseSchema");
const userSchema = require("../models/user/userSchema");
const crypto = require("crypto");
const surveySchema = require("../models/survey/surveySchema");
const addForm = async (req, res) => {
  try {
    const { firebase_id, firebase_user, form, provider_user } = req.body;
    const uid = provider_user._id;
    if (!form.title) {
      return res.status(400).json({
        success: false,
        error: { message: "Form fields not valid" },
      });
    } else {
      const allUserForms = await formSchema.find({ uid });
      if (allUserForms && allUserForms.length >= 5) {
        return res.status(403).json({
          success: false,
          error: { message: "Maximum form creation limit reached" },
        });
      } else {
        const newForm = new formSchema({
          uid,
          title: form.title,
          description: form.description,
          secret: crypto.randomBytes(24).toString("hex"),
        });

        const formSave = await newForm.save();
        return res.status(200).json({ success: true });
      }
    }
  } catch (error) {
    return res.json({ error: CONSTANTS.ERRORS.SERVER_ERROR });
  }
};

const deleteForm = async (req, res) => {
  try {
    const { provider_form } = req.body;
    await formSchema.findByIdAndDelete(provider_form._id);
    await surveySchema.findOneAndDelete({ fid: provider_form._id });
    await responseSchema.deleteMany({ fid: provider_form._id });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.json({ error: CONSTANTS.ERRORS.SERVER_ERROR });
  }
};

const updateFormInfo = async (req, res) => {
  try {
    const { firebase_id, firebase_user, form, provider_form, provider_user } =
      req.body;
    const { rules, ...updatedForm } = form;
    const formSave = await formSchema.findByIdAndUpdate(provider_form._id, {
      ...updatedForm,
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.json({ error: CONSTANTS.ERRORS.SERVER_ERROR });
  }
};

const updateFormSecret = async (req, res) => {
  try {
    const { firebase_id, firebase_user, provider_form, provider_user } =
      req.body;

    const secret = crypto.randomBytes(24).toString("hex");
    const formSave = await formSchema.findByIdAndUpdate(provider_form._id, {
      secret,
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.json({ error: CONSTANTS.ERRORS.SERVER_ERROR });
  }
};

const getAllForms = async (req, res) => {
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
    const allResponses = await responseSchema.find({ fid: { $in: formIds } });
    allResponses.forEach((response) => {
      for (var i = 0; i < finalForms.length; i++) {
        if (
          finalForms[i]._id
            .toString()
            .localeCompare(response.fid.toString()) === 0
        ) {
          if (response.is_spam === true) {
            finalForms[i].spam++;
          } else {
            finalForms[i].response++;
          }
        }
      }
    });
    return res.status(200).json({ success: true, allForms: finalForms });
  } catch (error) {
    return res.json({ error: CONSTANTS.ERRORS.SERVER_ERROR });
  }
};

const getFormResponses = async (req, res) => {
  try {
    const { provider_form } = req.body;
    const { query, sortType, sortOrder } = req.query;
    console.log(req.query);
    const fid = provider_form._id;
    const keyValueQueries = query ? query.split(",") : null;
    let keyValues = {};

    if (keyValueQueries && keyValueQueries.length > 0) {
      keyValueQueries.forEach((keyValue) => {
        const kva = keyValue.split(":");
        if (kva.length === 2) {
          keyValues[`response.${kva[0]}`] = kva[1];
        }
      });
    }
    console.log({ keyValues, sortType, sortOrder });

    const responsesData = await responseSchema
      .find({ fid, ...keyValues })
      .sort({ [sortType]: sortOrder });

    return res.status(200).json({ success: true, responses: responsesData });
  } catch (error) {
    return res.json({ error: CONSTANTS.ERRORS.SERVER_ERROR });
  }
};

const deleteFormResponse = async (req, res) => {
  try {
    const { rid } = req.params;
    const { provider_form, provider_user } = req.body;
    console.log({ provider_user });
    await responseSchema.findByIdAndDelete(rid);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log({ error });
    return res.json({ error: CONSTANTS.ERRORS.SERVER_ERROR });
  }
};

const getFormById = async (req, res) => {
  try {
    const { provider_form } = req.body;
    return res.json({ form: provider_form });
  } catch (error) {
    return res.json({ error: CONSTANTS.ERRORS.SERVER_ERROR });
  }
};
module.exports = {
  addForm,
  deleteForm,
  getAllForms,
  getFormResponses,
  deleteFormResponse,
  updateFormInfo,
  updateFormSecret,
  getFormById,
};
