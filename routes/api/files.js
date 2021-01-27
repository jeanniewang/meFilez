const express = require("express");
const router = express.Router();
const passport = require("passport");
const File = require("../../models/File");
const validateFileInput = require("../../validations/file");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { isValid, errors } = validateFileInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    const newFile = new File({
      owner: req.user,
      fileName: req.body.fileName,
      fileType: req.body.fileType,
    });
    newFile
      .save()
      .then((file) => res.json(file))
      .catch((err) => res.json(err));
  }
);
// router.get("/file/:id", (req, res) => {});

module.exports = router;
