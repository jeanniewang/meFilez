const express = require("express");
const router = express.Router();
const passport = require("passport");
const Asset = require("../../models/Asset");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newAsset = new Asset({
      user: req.user,
      fileName: req.body.fileName,
      fileType: req.body.fileType,
    });
    newAsset
      .save()
      .then((asset) => res.json(asset))
      .catch((err) => res.json(err));
  }
);
// router.get("/file/:id", (req, res) => {});

module.exports = router;
