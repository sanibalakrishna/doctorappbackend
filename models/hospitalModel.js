const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { doctorSchema } = require("./doctorModel");

const departmentSchema = new Schema({
  name: {
    type: String,
    required: [true, "A Departmenst Should have a name"],
  },
  doctors: {
    type: [doctorSchema],
    default: [],
  },
});

const surgerySchema = new Schema({
  name: {
    type: String,
    required: [true, "Surgery should hava a name"],
  },
  cost: {
    type: Number,
    required: [true, "Surgery should hava a cost"],
  },
});
const testSchema = new Schema({
  name: {
    type: String,
    required: [true, "Test should hava a name"],
  },
  cost: {
    type: Number,
    required: [true, "Test should hava a cost"],
  },
});
const hospitalSchema = new Schema({
  name: {
    type: String,
    required: [true, "Hospital should hava a name"],
  },
  address: {
    type: String,
    required: [true, "Hospital should hava a address"],
  },
  rating: {
    type: Number,
  },
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  departments: {
    type: [departmentSchema],
    default: [],
  },
  surgeries: {
    type: [surgerySchema],
    default: [],
  },
  tests: {
    type: [testSchema],
    default: [],
  },
});

hospitalSchema.index({ location: "2dsphere" });
module.exports = mongoose.model("Hospital", hospitalSchema);
