const express = require("express");
const router = express.Router();
const { createUser, loginUser } = require("../controllers/userController");

router.post("/register", createUser);
router.post("/login", loginUser);
router.delete("/logout");

module.exports = router;
