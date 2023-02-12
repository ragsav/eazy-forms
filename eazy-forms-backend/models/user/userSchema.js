const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema(
  {
    firebase_id: { type: String, required: true, unique: true },
    email: {
      type: String,
    },
    picture: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("user", userSchema);
