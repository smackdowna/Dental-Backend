const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const booking = require("../models/BookingModel.js");
const sendToken = require("../utils/jwtToken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail.js");
const User = require("../models/UserModel");

//book appointment
exports.bookappointment = catchAsyncErrors(async (req, res, next) => {
  const { serviceName, state, city, address, appointmentDate } = req.body;

  
  if (!serviceName|| !state || !city || !address || !appointmentDate)
    return next(new ErrorHandler("Please fill all details", 400));

   await booking.create({
    serviceName,
    state,
    city,
    address,
    appointmentDate,
    user: req.user._id,
  });
  res.status(201).json({
    success: true,
    message: `Your Appointment Date is Booked on ${appointmentDate}`,
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
        Mobile: `${user.phoneNo}`
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
