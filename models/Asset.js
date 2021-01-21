const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssetSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  fileName: {
    type: String,
    required: true,
  },
  fileType: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Asset = mongoose.model("asset", AssetSchema);
module.exports = Asset;
