const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const bookSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: [true, "Please Select your service"],
  },
  state: {
    type: String,
    required: [true, "Please Enter Your state"],
  },
  city: {
    type: String,
    required: [true, "Please Enter Your state"],
  },
  address: {
    type: String,
    required: [true, "Please Enter your address"],
  },
  appointmentDate: {
    type: Date,
    required: [true, "Please Enter yyour appointment date"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Booking", bookSchema);
