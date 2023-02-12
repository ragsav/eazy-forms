const mongoose = require("mongoose");
const schema = mongoose.Schema;

const responseSchema = new schema(
  {
    fid: { type: schema.Types.ObjectId, required: true },
    response: { type: Object },
    is_spam:{type:Boolean,default:false},
  },
  { timestamps: true }
);

module.exports = Response = mongoose.model("response", responseSchema);
