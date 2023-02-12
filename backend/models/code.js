const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const codeSchema = mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  code: {
    type: Number,
    required: true,
  },
  codeExpire: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Code", codeSchema);
