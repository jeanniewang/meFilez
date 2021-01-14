const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, "test", {
    expiresIn: 60 * 24 * 60,
  });
};

router.post("/register", (req, res) => {
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
  User.findOne({ username: req.body.username }).then((user) => {
    if (!user) {
      return res.status(404).json({ username: "This user does not exist." });
    } else {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (err) return res.json(err);
        return isMatch
          ? res.json({ username: req.body.username })
          : res.json({ message: "Invalid credentials" });
      });
    }
  });
});

module.exports = router;
