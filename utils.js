const jwt = require("jsonwebtoken");
const key = require("./config/keys");

const createToken = (user) => {
  const _id = user._id;
  const expiresIn = 60 * 24 * 60;
  const payload = {
    sub: _id,
    iat: Date.now(),
  };

  const signedToken = jwt.sign(payload, key.secretOrKey, {
    expiresIn,
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
};

module.exports.createToken = createToken;
