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
