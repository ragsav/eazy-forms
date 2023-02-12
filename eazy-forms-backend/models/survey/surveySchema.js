const mongoose = require("mongoose");
const schema = mongoose.Schema;

const surveySchema = new schema(
  {
    fid: { type: schema.Types.ObjectId, required: true, ref: "form" },
    questions: { type: Object, required: true },
  },
  { timestamps: true }
);

module.exports = Survey = mongoose.model("survey", surveySchema);
