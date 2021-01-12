const express = require("express");
const router = express.Router();
const User = require("../../models/User");

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
        .then((user) => res.json(user))
        .catch((err) => res.json(err));
    }
  });
});

module.exports = router;
