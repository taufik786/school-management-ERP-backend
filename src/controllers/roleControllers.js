const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const RoleModel = require("../models/roleModel");

// Add School
exports.createRole = catchAsyncErrors(async (req, res, next) => {
  const roleExist = await RoleModel.findOne({
    Role: req.body.Role,
  });
  if (roleExist) {
    return res.status(500).json({
      message: "Role already exist.",
      success: false,
      data: null,
    });
  }
  req.body.CreatedBy = { userId: req.user._id, Role: req.user.Role };
  req.body.UpdatedBy = { userId: req.user._id, Role: req.user.Role };

  const role = await RoleModel(req.body).save();
  res.status(201).json({
    message: "Role added successfully.",
    success: true,
    data: role,
  });
});

// Update School
exports.updateRole = catchAsyncErrors(async (req, res, next) => {
  const roleExist = await RoleModel.findById({ _id: req.body._id });
  if (!roleExist) {
    return res.status(500).json({
      message: "Role not found.",
      success: false,
      data: null,
    });
  }

  const duplicateRole = await RoleModel.findOne({
    Role: req.body.Role,
    _id: { $ne: req.body._id },
  });
  if (duplicateRole) {
    return res.status(500).json({
      message: "Role already exist.",
      success: false,
      data: duplicateRole,
    });
  }
  const role = await RoleModel.findByIdAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true }
  );

  res.status(201).json({
    message: "Role updated successfully.",
    success: true,
    data: role,
  });
});

// All School Lists
exports.allRoleLists = catchAsyncErrors(async (req, res, next) => {
  const role = await RoleModel.find({ Deleted: false }).sort({updatedAt:-1});
  if (role.length <= 0) {
    return res.status(500).json({
      message: "Role not found.",
      success: false,
      data: role,
    });
  }
  res.status(201).json({
    message: "Role fetched successfully.",
    success: true,
    data: role,
  });
});

// Single School
exports.singleRole = catchAsyncErrors(async (req, res, next) => {
  const role = await RoleModel.findOne({
    _id: req.params.id,
    Deleted: false,
  });
  if (!role) {
    return res.status(500).json({
      message: "Role not found.",
      success: false,
      data: role,
    });
  }
  res.status(201).json({
    message: "Role fetched successfully.",
    success: true,
    data: role,
  });
});

// Delete School
exports.deleteRole = catchAsyncErrors(async (req, res, next) => {
  const role = await RoleModel.findByIdAndUpdate(
    { _id: req.params.id },
    { Deleted: true },
    { new: true }
  );
  if (!role) {
    return res.status(500).json({
      message: "Role not found.",
      success: false,
      data: role,
    });
  }
  res.status(201).json({
    message: "Role deleted successfully.",
    success: true,
    data: role,
  });
});
