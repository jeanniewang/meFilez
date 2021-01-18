const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  assets: [
    {
      type: Schema.Types.ObjectId,
      ref: "Asset",
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", function (next) {
  const user = this;

  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err, null);
    cb(null, isMatch);
  });
};

const User = mongoose.model("user", UserSchema);

module.exports = User;
