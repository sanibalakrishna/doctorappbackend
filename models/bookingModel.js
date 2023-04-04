const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  time: {
    type: String,
    required: [true, "Booking should have a time"],
  },
  date: {
    type: String,
    required: [true, "Booking should have a date"],
  },
  userid: {
    type: String,
    required: [true, "Booking should have a userid"],
  },
  doctorid: {
    type: String,
    required: [true, "Booking should have a doctorid"],
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
