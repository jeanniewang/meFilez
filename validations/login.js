const validString = require("./valid-string");
const Validator = require("validator");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = validString(data.email) ? data.email : "";
  data.password = validString(data.password) ? data.password : "";

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email must be valid";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
