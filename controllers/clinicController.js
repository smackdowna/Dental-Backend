const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const { Clinic } = require("../models/ClinicModel.js");

//create clinic
exports.createClinic = catchAsyncErrors(async (req, res, next) => {
  const { state, city, address, schedule } = req.body;

  if (!state || !city || !address || !schedule)
    return next(new ErrorHandler("Please fill all details", 400));

  const clinic = new Clinic({
    state,
    city,
    address,
    schedule: schedule || []
  });

  await clinic.save();

  res.status(201).json({
    success: true,
    message: `Clinic Added Successfully`,
  });
});

//get all clinic
exports.getAllClinic = catchAsyncErrors(async (req, res, next) => {
  const clinics = await Clinic.find({});
  res.status(200).json({
    success: true,
    clinics,
  });
});

//get a  single clinic
exports.getAClinic = catchAsyncErrors(async (req, res, next) => {
  const { clinicId } = req.params;

  const clinic = await Clinic.findById(clinicId);

  if (!clinic) {
    return res
      .status(404)
      .json({ success: false, message: "Clinic not found." });
  }

  res.status(200).json({
    success: true,
    clinic,
  });
});

//delete clinic
exports.deleteClinic = catchAsyncErrors(async (req, res, next) => {
  const { clinicId } = req.params;

  const clinic = await Clinic.findByIdAndDelete(clinicId);

  if (!clinic) {
    return res
      .status(404)
      .json({ success: false, message: "Clinic not found." });
  }

  res
    .status(200)
    .json({ success: true, message: "Clinic deleted successfully." });
});

//update clinic
exports.UpdateClinic = catchAsyncErrors(async (req, res, next) => {
  const { clinicId } = req.params;
  const { state, city, address, schedule } = req.body;

  // Update clinic details
  const updatedClinic = await Clinic.findByIdAndUpdate(
    clinicId,
    {
      ...(state && { state }),
      ...(city && { city }),
      ...(address && { address }),
      ...(schedule && { schedule }), // Replace the entire schedule if provided
    },
    { new: true, runValidators: true } // Return updated document and validate
  );

  if (!updatedClinic) {
    return res
      .status(404)
      .json({ success: false, message: "Clinic not found." });
  }

  res
    .status(200)
    .json({
      success: true,
      message: "Clinic updated successfully.",
      clinic: updatedClinic,
    });
});
