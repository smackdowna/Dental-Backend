const mongoose = require("mongoose");

const clinicSchema = new mongoose.Schema({
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  schedule: [
    {
      date: {
        type: Date,
        required: true,
      },
      slots: [
        {
          time: { type: String, required: true }, // Time in "HH:MM" format
          isBooked: { type: Boolean, default: false }, // Whether the slot is booked
        },
      ],
    },
  ],
}); // Adds createdAt and updatedAt fields

const Clinic = mongoose.model("Clinic", clinicSchema);

module.exports = { Clinic };
