const express = require("express");
const router = express.Router();
const createUser = require("../../api/controllers/user");
const loginUser = require("../../api/controllers/user");

router.post("/register", createUser);

router.post("/login", loginUser);

router.get("/logout", (req, res) => {
  res.redirect("/");
});

module.exports = router;
