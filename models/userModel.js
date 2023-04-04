const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Doctor = require("./doctorModel");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "User should have a name"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "User should have a email"],
  },
  password: {
    type: String,
    required: [true, "User should have a password"],
  },
  faviroutes: {
    type: [String],
    default: [],
  },
  bookings: {
    type: [String],
    default: [],
  },
});

userSchema.statics.signup = async function (name, email, password) {
  //    validation
  if (!name || !email || !password) {
    throw Error("All fields must be entered");
  }
  if (!validator.isEmail(email)) {
    throw Error("Enter a valid email address");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Enter a strong password");
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email is already in use");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ name, email, password: hash });
  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be entered");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect Email");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect Password");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
