const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const booking = require("../models/BookingModel.js");
const sendToken = require("../utils/jwtToken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail.js");
const User = require("../models/UserModel");
const { Clinic } = require("../models/ClinicModel.js");

//book appointment
exports.bookAppointment = catchAsyncErrors(async (req, res, next) => {
  const { clinicId, serviceName, state, city, address, appointmentDate, time } = req.body;

  // Validate input
  if (!clinicId || !serviceName || !state || !city || !address || !appointmentDate || !time) {
    return next(new ErrorHandler("Please fill all details", 400));
  }

  // Step 1: Check if the clinic exists
  const clinic = await Clinic.findById(clinicId);
  if (!clinic) {
    return next(new ErrorHandler("Clinic not found", 404));
  }

 
  // Step 2: Check if the time slot is available
  const schedule = clinic.schedule.find(
    (s) => new Date(s.date).toISOString().split("T")[0] === appointmentDate
  );

  if (!schedule) {
    return next(new ErrorHandler("No schedule available for this date", 404));
  }

  const slot = schedule.slots.find((s) => s.time === time);
  if (!slot) {
    return next(new ErrorHandler("Time slot not found", 404));
  }

  if (slot.isBooked) {
    return next(new ErrorHandler("This time slot is already booked", 400));
  }

  // Step 3: Create the booking
  await booking.create({
    serviceName,
    state,
    city,
    address,
    appointmentDate,
    time,
    user: req.user._id,
  });

  // Step 4: Mark the slot as booked in the Clinic table
  slot.isBooked = true;
  await clinic.save();

  res.status(201).json({
    success: true,
    message: `Your appointment is booked on ${appointmentDate} at ${time}`,
  });
});



//get all appointment
exports.getAllAppointment = catchAsyncErrors(async (req, res, next) => {
  const appointmentCount = await booking.countDocuments();

  appointment = await booking.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    appointmentCount,
    appointment,
  });
});

//get single appointment details
exports.getSingleAppointment = catchAsyncErrors(async (req, res, next) => {
  const book = await booking.findById(req.params.id);

  if (!book) {
    return next(new ErrorHandler("Appointment not found with this Id", 404));
  }

  const id = book.user;

  const user = await User.findById(id);

  res.status(200).json({
    success: true,
    book,
    userdetails: {
      first_name: `${user.first_name}`,
      email: `${user.email}`,
      Mobile: `${user.phoneNo}`,
    },
  });
});

//get my appointment
exports.myAppointment = catchAsyncErrors(async (req, res, next) => {
  // Fetch bookings where the `user` field matches `req.user._id`
  const book = await booking.find({ user: req.user._id }).sort({
    createdAt: -1,
  });

  // Check if a booking is found
  if (!book) {
    return next(new ErrorHandler("No appointments found for this user.", 404));
  }

  // Return the booking details
  res.status(200).json({
    success: true,
    book,
  });
});
