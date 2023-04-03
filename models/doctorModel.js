const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  name: {
    type: String,
    required: [true, "Doctor should have a name"],
  },
  qualification: {
    type: String,
    required: [true, "Doctor should have a qualification"],
  },
  specilization: {
    type: String,
    required: [true, "Doctor should have a specilization"],
  },
  arriveTime: {
    type: String,
  },
  departTime: {
    type: String,
  },
});
const Doctor = mongoose.model("Doctor", doctorSchema)
module.exports = {Doctor,doctorSchema};
