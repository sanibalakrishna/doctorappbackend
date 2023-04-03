const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "User should have a name"],
  },
  email: {
    type: String,
    required: [true, "User should have a email"],
  },
  password: {
    type: String,
    required: [true, "User should have a password"],
  },
});

module.exports = mongoose.model("User", userSchema);
