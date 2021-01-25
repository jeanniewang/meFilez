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
  fileType: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  parentFileId: {
    type: Schema.Types.ObjectId,
    ref: "File",
  },
  subFilesIds: {
    type: [{ type: Schema.Types.ObjectId, ref: "File" }],
  },
});

const File = mongoose.model("file", FileSchema);
module.exports = file;
