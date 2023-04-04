const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, {
    expiresIn: "3d",
  });
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.status(200).json({ name:user.name, email, token });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.signup(name, email, password);
    const token = createToken(user._id);
    console.log(name, email, password);
    res.status(200).json({ name, email, token });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
module.exports = { loginUser, signupUser };
