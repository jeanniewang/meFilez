const express = require("express");
const mongoose = require("mongoose");
const app = express();
const db = require("./config/keys").mongoURI;
const bodyParser = require("body-parser");
const users = require("./routes/api/users");
const files = require("./routes/api/files");
const passport = require("passport");
require("./config/passport")(passport);

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Test"));

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

app.use(passport.initialize());

app.use("/api/users", users);
app.use("/api/files", files);
const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
