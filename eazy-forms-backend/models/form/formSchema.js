const mongoose = require("mongoose");
const schema = mongoose.Schema;

const formSchema = new schema(
  {
    uid: { type: schema.Types.ObjectId, required: true, ref: "user" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    is_active: {
      type: Boolean,
      default: true,
    },
    is_fav: {
      type: Boolean,
      default: false,
    },
    secret: {
      type: String,
      required: true,
    },
    questions: { type: Object },
    slack_url: { type: String },
    telegram_token: { type: String },
    telegram_chat_id: { type: String },
  },
  { timestamps: true }
);

module.exports = Form = mongoose.model("form", formSchema);
