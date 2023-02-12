const responseSchema = require("../models/response/responseSchema");

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
    return res.status(400).json({ success: false, error });
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
    return res.status(400).json({ success: false, error });
  }
};

module.exports = {
  getFormResponses,
  deleteFormResponse,
};
