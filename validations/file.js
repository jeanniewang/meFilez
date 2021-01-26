const validString = require("./valid-string");
const Validator = require("validator");

module.exports = function validateFileInput(data) {
  let errors = {};

  data.fileName = validString(data.fileName) ? data.fileName : "";
  data.fileType = validString(data.fileType) ? data.fileType : "";

  if (Validator.isEmpty(data.fileName)) {
    errors.fileName = "File name is required";
  }

  if (Validator.isEmpty(data.fileType)) {
    errors.fileType = "File type is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
