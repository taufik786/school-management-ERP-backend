const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const SchoolModel = require("../models/schoolModels");

exports.addSchool = catchAsyncErrors(async (req, res, next) => {
  const school = await SchoolModel(req.body).save();
  res.status(201).json({
    message: "School/college added successfully.",
    success: true,
    school,
  });
});

exports.editSchool = catchAsyncErrors(async (req, res, next) => {
  const school = await SchoolModel.findByIdAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true }
  );
  if (!school) {
    return res.status(500).json({
      message: "School/college not found.",
      success: false,
      school,
    });
  }
  res.status(201).json({
    message: "School/college updated successfully.",
    success: true,
    school,
  });
});
exports.allSchoolLists = catchAsyncErrors(async (req, res, next) => {
  const school = await SchoolModel.find({ deleted: false });
  if (school.length <= 0) {
    return res.status(500).json({
      message: "School/college not found.",
      success: false,
      school,
    });
  }
  res.status(201).json({
    message: "School/college fetched successfully.",
    success: true,
    school,
  });
});

exports.deleteSchool = catchAsyncErrors(async (req, res, next) => {
  const school = await SchoolModel.findByIdAndUpdate(
    { _id: req.params.id },
    { deleted: true },
    { new: true }
  );
  if (!school) {
    return res.status(500).json({
      message: "School/college not found.",
      success: false,
      school,
    });
  }
  res.status(201).json({
    message: "School/college deleted successfully.",
    success: true,
    school,
  });
});

exports.singleSchool = catchAsyncErrors(async (req, res, next) => {
  const school = await SchoolModel.findById({ _id: req.params.id });
  if (!school) {
    return res.status(500).json({
      message: "School/college not found.",
      success: false,
      school,
    });
  }
  res.status(201).json({
    message: "School/college fetched successfully.",
    success: true,
    school,
  });
});