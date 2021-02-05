const express = require("express");
const mongoose = require("mongoose");
const app = express();
const db = require("./config/keys").mongoURI;
const bodyParser = require("body-parser");
const users = require("./api/routes/users");
const files = require("./api/routes/files");
const passport = require("passport");
require("./config/passport")(passport);
require("dotenv").config();

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => app.listen(process.env.port || 5000))
  .catch((err) => console.log(err));

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.get("/", (req, res) => res.send("Test"));

app.use(bodyParser.json());
app.use(passport.initialize());

app.use("/api/users", users);
app.use("/api/files", files);
