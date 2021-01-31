const User = require("../../models/User");
const validateRegisterInput = require("../../validations/register");
const validateLoginInput = require("../../validations/login");
const utils = require("../../utils");

const createUser = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res
        .status(400)
        .json({ email: "A user with that email already exists." });
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      newUser
        .save()
        .then((user) => {
          const jwt = utils.createToken(user);
          return res.json({
            success: true,
            user: user,
            token: jwt.token,
            expiresIn: jwt.expires,
          });
        })
        .catch((err) => res.json(err));
    }
  });
};

const loginUser = (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    email: req.body.email,
  }).then((user) => {
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "This user does not exist." });
    } else {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (err) return res.json({ success: false, message: err });

        if (isMatch) {
          const jwt = utils.createToken(user);
          return res.json({
            success: true,
            user: user._id,
            token: jwt.token,
            expiresIn: jwt.expires,
          });
        } else {
          return res.json({ message: "Invalid credentials" });
        }
      });
    }
  });
};

module.exports = {
  createUser,
  loginUser,
};
