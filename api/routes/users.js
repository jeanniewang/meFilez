const express = require("express");
const router = express.Router();
const { createUser, loginUser } = require("../../controllers/user");

router.post("/register", createUser);

router.post("/login", loginUser);

router.get("/logout", (req, res) => {
  res.redirect("/");
});

module.exports = router;
