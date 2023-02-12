const { default: mongoose } = require("mongoose");
const Hospital = require("../models/hospitalModel");
const { Doctor } = require("../models/doctorModel");

// get all hospital
const getAllHospital = async (req, res) => {
  const hospitals = await Hospital.find();
  res.status(200).json(hospitals);
};

// get a specifi hospital
const getHospital = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "no such hospital found" });
  }
  const hospital = await Hospital.findById(id);
  if (!hospital) {
    return res.status(404).json({ message: "no such hospital found" });
  }
  res.status(200).json(hospital);
};

// get a hospital in locaiton
const getHospitalByLocation = async (req, res) => {
  const { latitude, longitude } = req.params;

  const hospital = await Hospital.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [latitude, longitude],
        },
        $maxDistance: 5000,
      },
    },
  });
  if (!hospital) {
    return res.status(400).json({ message: "no hospitals found in location" });
  }
  res.status(200).json(hospital);
};

// create a hospital
const createHospital = async (req, res) => {
  const { name, address, rating, location } = req.body;
  const emptyfiels = [];
  if (!name) {
    emptyfiels.push("name");
  }
  if (!address) {
    emptyfiels.push("address");
  }
  if (!location) {
    emptyfiels.push("location");
  }

  if (emptyfiels.length > 0) {
    return res
      .status(400)
      .json({ message: "Please fill all the fields", fields: emptyfiels });
  }

  try {
    const hospital = new Hospital({ name, address, rating, location });
    hospital.save();
    res.status(200).json(hospital);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// update Surgeries
const updateSurgeries = async (req, res) => {
  const { id } = req.params;
  const { surgery } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "no such hospital found" });
  }
  const hospital = await Hospital.findOneAndUpdate(
    { _id: id },
    { $push: { surgeries: surgery } }
  );
  if (!hospital) {
    return res.status(404).json({ message: "no such hospital found" });
  }
  res.status(200).json(hospital);
};

// update tests
const updateTests = async (req, res) => {
  const { id } = req.params;
  const { test } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "no such hospital found" });
  }
  const hospital = await Hospital.findOneAndUpdate(
    { _id: id },
    { $push: { tests: test } }
  );
  if (!hospital) {
    return res.status(404).json({ message: "no such hospital found" });
  }
  res.status(200).json(hospital);
};
// update a departments
const updateDepartments = async (req, res) => {
  const { id } = req.params;
  const { department } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "no such hospital found" });
  }
  const hospital = await Hospital.findOneAndUpdate(
    { _id: id },
    { $push: { departments: { department } } }
  );
  if (!hospital) {
    return res.status(404).json({ message: "no such hospital found" });
  }
  res.status(200).json(hospital);
};

// update a doctor in hospital
const updateDepartmentDoctor = async (req, res) => {
  const { id, departmentid } = req.params;
  const { doctor } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "no such hospital found" });
  }
  const hospital = await Hospital.findOneAndUpdate(
    { _id: id, "departments._id": departmentid },
    { $push: { "departments.$.doctors": doctor } }
  );
  if (!hospital) {
    return res.status(404).json({ message: "no such hospital found" });
  }

  res.status(200).json(hospital);
};

// update a hospital
const updateHospital = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "no such hospital found" });
  }
  const hospital = await Hospital.findOneAndUpdate({ _id: id }, req.body);
  if (!hospital) {
    return res.status(404).json({ message: "no such hospital found" });
  }
  res.status(200).json(hospital);
};

// delete a hospital
const deleteHospital = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "no such hospital found" });
  }
  const hospital = await Hospital.findOneAndDelete({ _id: id });
  if (!hospital) {
    return res.status(404).json({ message: "no such hospital found" });
  }
  res.status(200).json(hospital);
};

module.exports = {
  getHospital,
  createHospital,
  getAllHospital,
  updateHospital,
  deleteHospital,
  getHospitalByLocation,
  updateSurgeries,
  updateTests,
  updateDepartments,
  updateDepartmentDoctor,
};
