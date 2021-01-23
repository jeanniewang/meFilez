const jwt = require("jsonwebtoken");
const key = require("./config/keys").secretOrKey;

const createToken = (id) => {
  const expiresIn = 60 * 24 * 60;
  const signedToken = jwt.sign({ id }, key, {
    expiresIn,
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
};

module.exports.createToken = createToken;
