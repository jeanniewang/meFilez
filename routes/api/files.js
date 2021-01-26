const express = require("express");
const router = express.Router();
const passport = require("passport");
const File = require("../../models/File");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
