const { default: mongoose } = require("mongoose");
const User = require("../models/userModel");

const getAllUser = async (req, res) => {
  const user = await User.find();
  res.status(200).json(user);
};

// get a specific doctor
const getUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "no such user found" });
  }
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: "no such user found" });
  }
  res.status(200).json(user);
};

// create a doctor
const createUser = async (req, res) => {
  const { name, age } = req.body;
  const emptyfiels = [];
  if (!name) {
    emptyfiels.push("name");
  }
  if (!age) {
    emptyfiels.push("age");
  }

  if (emptyfiels.length > 0) {
    return res
      .status(400)
      .json({ message: "Please fill all the fields", fields: emptyfiels });
  }

  try {
    const user = new User({ name, age });
    user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// update a doctor
const updateUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "no such doctor found" });
  }
  const user = await User.findOneAndUpdate({ _id: id }, req.body);
  if (!user) {
    return res.status(404).json({ message: "no such doctor found" });
  }
  res.status(200).json(user);
};

// delete a doctor
const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "no such doctor found" });
  }
  const user = await User.findOneAndDelete({ _id: id });
  if (!user) {
    return res.status(404).json({ message: "no such doctor found" });
  }
  res.status(200).json(user);
};

const updateFaviroutes = async (req, res) => {
  const { id } = req.params;
  const { faviroute } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "no such user found" });
  }
  const user = await User.findOneAndUpdate(
    { _id: id },
    { $push: { faviroutes: faviroute } }
  );
  if (!user) {
    return res.status(404).json({ message: "no such user found" });
  }

  res.status(200).json(user);
};

module.exports = {
  getUser,
  createUser,
  getAllUser,
  updateUser,
  deleteUser,
  updateFaviroutes,
};
