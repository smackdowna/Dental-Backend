const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/UserModel");
const sendToken = require("../utils/jwtToken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail.js");

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const {
    first_name,
    last_name,
    phoneNo,
    email,
    password,
    confirm_password,
    dob,
    induranceStatus,
  } = req.body;

  if (
    !first_name ||
    !last_name ||
    !phoneNo ||
    !email ||
    !password ||
    !confirm_password ||
    !dob ||
    !induranceStatus
  )
    return next(new ErrorHandler("Please fill all details", 400));

  if (password != confirm_password)
    return next(
      new ErrorHandler("Password and Confirm Password Doesn't Match", 400)
    );

  let user = await User.findOne({ email });

  if (user) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });
  }

  user = await User.create({
    first_name,
    last_name,
    phoneNo,
    email,
    password,
    confirm_password,
    dob,
    induranceStatus,
  });
  res.status(201).json({
    success: true,
    message: "Registered Successfully",
  });
});

//login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", "", {
    expires: new Date(0), // Set the expiration date to a past date to immediately expire the cookie
    httpOnly: true,
    secure: "true", // Set to true in production, false in development
    sameSite: "None", // Ensure SameSite is set to None for cross-site cookies
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});
