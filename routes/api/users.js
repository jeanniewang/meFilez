const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const key = require("../../config/keys").secretOrKey;
const validateRegisterInput = require("../../validations/register");
const validateLoginInput = require("../../validations/login");

const createToken = (id) => {
  return jwt.sign({ id }, key, {
    expiresIn: 60 * 24 * 60,
  });
};

router.post("/register", (req, res) => {
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
          const token = createToken(user._id);
          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 60 * 24 * 60 * 1000,
          });
          res.json({ user: user._id });
        })
        .catch((err) => res.json(err));
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    username: req.body.username,
  }).then((user) => {
    if (!user) {
      return res.status(404).json({ username: "This user does not exist." });
    } else {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (err) return res.json(err);

        if (isMatch) {
          const token = createToken(user._id);
          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 60 * 24 * 60 * 1000,
          });
          return res.json({ username: user.username });
        } else {
          return res.json({ message: "Invalid credentials" });
        }
      });
    }
  });
});

module.exports = router;
