const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const SchoolModel = require("../models/schoolModels");

// Add School
exports.addSchool = catchAsyncErrors(async (req, res, next) => {
  req.body.CreatedBy = { userId: req.user._id, Name: req.user.Name };
  req.body.UpdatedBy = { userId: req.user._id, Name: req.user.Name };
  const schoolExist = await SchoolModel.findOne({
    SchoolName: req.body.SchoolName,
  });
  if (schoolExist) {
    return res.status(500).json({
      message: "School/college already exist.",
      success: false,
      data: null,
    });
  }
  const school = await SchoolModel(req.body).save();
  res.status(201).json({
    message: "School/college added successfully.",
    success: true,
    data: school,
  });
});

// Update School
exports.editSchool = catchAsyncErrors(async (req, res, next) => {
  const schoolExist = await SchoolModel.findById({ _id: req.body._id });
  if (!schoolExist) {
    return res.status(500).json({
      message: "School/college not found.",
      success: false,
      data: null,
    });
  }

  const duplicateSchool = await SchoolModel.findOne({
    SchoolName: req.body.SchoolName,
    _id: { $ne: req.body._id },
  });
  if (duplicateSchool) {
    return res.status(500).json({
      message: "School/college already exist.",
      success: false,
      data: duplicateSchool,
    });
  }
  req.body.UpdatedBy = { userId: req.user._id, Name: req.user.Name };
  const school = await SchoolModel.findByIdAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true }
  );

  res.status(200).json({
    message: "School/college updated successfully.",
    success: true,
    data: school,
  });
});

// All School Lists
exports.allSchoolLists = catchAsyncErrors(async (req, res, next) => {
  const school = await SchoolModel.find({ Deleted: false }).sort({updatedAt:-1});
  if (school.length <= 0) {
    return res.status(500).json({
      message: "School/college not found.",
      success: false,
      data: school,
    });
  }
  res.status(200).json({
    message: "School/college fetched successfully.",
    success: true,
    data: school,
  });
});

// Delete School
exports.deleteSchool = catchAsyncErrors(async (req, res, next) => {
  const school = await SchoolModel.findByIdAndUpdate(
    { _id: req.params.id },
    { Deleted: true },
    { new: true }
  );
  if (!school) {
    return res.status(500).json({
      message: "School/college not found.",
      success: false,
      data: school,
    });
  }
  res.status(200).json({
    message: "School/college deleted successfully.",
    success: true,
    data: school,
  });
});

// Single School
exports.singleSchool = catchAsyncErrors(async (req, res, next) => {
  const school = await SchoolModel.findOne({
    _id: req.params.id,
    Deleted: false,
  });
  if (!school) {
    return res.status(500).json({
      message: "School/college not found.",
      success: false,
      data: school,
    });
  }
  res.status(200).json({
    message: "School/college fetched successfully.",
    success: true,
    data: school,
  });
});
