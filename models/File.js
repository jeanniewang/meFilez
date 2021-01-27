const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FileSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  fileName: {
    type: String,
    required: true,
  },
  isFolder: {
    type: Boolean,
    required: true,
  },
  parentId: {
    type: Schema.Types.ObjectId,
    default: null,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const File = mongoose.model("file", FileSchema);
module.exports = File;
