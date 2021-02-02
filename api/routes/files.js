const express = require("express");
const router = express.Router();
const passport = require("passport");
const { createFile } = require("../controllers/fileController");

router.post("/", passport.authenticate("jwt", { session: false }), createFile);

module.exports = router;
