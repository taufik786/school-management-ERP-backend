const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const StaffModel = require("../models/classesModel");

// Add School
exports.createStaff = catchAsyncErrors(async (req, res, next) => {
  const staffExist = await StaffModel.findOne({
    Name: req.body.Name,
  });
  if (staffExist) {
    return res.status(500).json({
      message: "Staff already exist.",
      success: false,
      data: null,
    });
  }
  req.body.CreatedBy = { userId: req.user._id, Name: req.user.Name };
  req.body.UpdatedBy = { userId: req.user._id, Name: req.user.Name };

  const Staff = await StaffModel(req.body).save();
  res.status(201).json({
    message: "Staff added successfully.",
    success: true,
    data: Staff,
  });
});

// Update School
exports.updateStaff = catchAsyncErrors(async (req, res, next) => {
  const staffExist = await StaffModel.findById({ _id: req.body._id });
  if (!staffExist) {
    return res.status(500).json({
      message: "Staff not found.",
      success: false,
      data: null,
    });
  }

  const duplicateStaff = await StaffModel.findOne({
    Name: req.body.Name,
    _id: { $ne: req.body._id },
  });
  if (duplicateStaff) {
    return res.status(500).json({
      message: "Staff already exist.",
      success: false,
      data: duplicateStaff,
    });
  }
  const Staff = await StaffModel.findByIdAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true }
  );

  res.status(201).json({
    message: "Staff updated successfully.",
    success: true,
    data: Staff,
  });
});

// All School Lists
exports.allStaffLists = catchAsyncErrors(async (req, res, next) => {
  const Staff = await StaffModel.find({ Deleted: false }).sort({updatedAt:-1});
  if (Staff.length <= 0) {
    return res.status(500).json({
      message: "Staff not found.",
      success: false,
      data: Staff,
    });
  }
  res.status(201).json({
    message: "Staffes fetched successfully.",
    success: true,
    data: Staff,
  });
});

// Single School
exports.singleStaff = catchAsyncErrors(async (req, res, next) => {
  const Staff = await StaffModel.findOne({
    _id: req.params.id,
    Deleted: false,
  });
  if (!Staff) {
    return res.status(500).json({
      message: "Staff not found.",
      success: false,
      data: Staff,
    });
  }
  res.status(201).json({
    message: "Staff fetched successfully.",
    success: true,
    data: Staff,
  });
});

// Delete School
exports.deleteStaff = catchAsyncErrors(async (req, res, next) => {
  const Staff = await StaffModel.findByIdAndUpdate(
    { _id: req.params.id },
    { Deleted: true },
    { new: true }
  );
  if (!Staff) {
    return res.status(500).json({
      message: "Staff not found.",
      success: false,
      data: Staff,
    });
  }
  res.status(201).json({
    message: "Staff deleted successfully.",
    success: true,
    data: Staff,
  });
});
