const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FileSchema = new Schema(
  {
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
    },
    parentId: {
      type: Schema.Types.ObjectId,
      default: null,
    },
  },
  { timestamps: true }
);

const File = mongoose.model("file", FileSchema);
module.exports = File;
