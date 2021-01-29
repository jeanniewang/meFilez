const validString = require("./valid-string");
const Validator = require("validator");

module.exports = function validateFileInput(data) {
  let errors = {};

  data.fileName = validString(data.fileName) ? data.fileName : "";

  if (Validator.isEmpty(data.fileName)) {
    errors.fileName = "File name is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
