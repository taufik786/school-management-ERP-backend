const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ClassModel = require("../models/classesModel");

// Add School
exports.createClass = catchAsyncErrors(async (req, res, next) => {
  const classExist = await ClassModel.findOne({
    ClassName: req.body.ClassName,
  });
  if (classExist) {
    return res.status(500).json({
      message: "Class already exist.",
      success: false,
      data: null,
    });
  }
  req.body.CreatedBy = { userId: req.user._id, ClassName: req.user.ClassName };
  req.body.UpdatedBy = { userId: req.user._id, ClassName: req.user.ClassName };

  const Class = await ClassModel(req.body).save();
  res.status(201).json({
    message: "Class added successfully.",
    success: true,
    data: Class,
  });
});

// Update School
exports.updateClass = catchAsyncErrors(async (req, res, next) => {
  const classExist = await ClassModel.findById({ _id: req.body._id });
  if (!classExist) {
    return res.status(500).json({
      message: "Class not found.",
      success: false,
      data: null,
    });
  }

  const duplicateClass = await ClassModel.findOne({
    ClassName: req.body.ClassName,
    _id: { $ne: req.body._id },
  });
  if (duplicateClass) {
    return res.status(500).json({
      message: "Class already exist.",
      success: false,
      data: duplicateClass,
    });
  }
  const Class = await ClassModel.findByIdAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true }
  );

  res.status(201).json({
    message: "Class updated successfully.",
    success: true,
    data: Class,
  });
});

// All School Lists
exports.allClassLists = catchAsyncErrors(async (req, res, next) => {
  const Class = await ClassModel.find({ Deleted: false }).sort({updatedAt:-1});
  if (Class.length <= 0) {
    return res.status(500).json({
      message: "Class not found.",
      success: false,
      data: Class,
    });
  }
  res.status(201).json({
    message: "Classes fetched successfully.",
    success: true,
    data: Class,
  });
});

// Single School
exports.singleClass = catchAsyncErrors(async (req, res, next) => {
  const Class = await ClassModel.findOne({
    _id: req.params.id,
    Deleted: false,
  });
  if (!Class) {
    return res.status(500).json({
      message: "Class not found.",
      success: false,
      data: Class,
    });
  }
  res.status(201).json({
    message: "Class fetched successfully.",
    success: true,
    data: Class,
  });
});

// Delete School
exports.deleteClass = catchAsyncErrors(async (req, res, next) => {
  const Class = await ClassModel.findByIdAndUpdate(
    { _id: req.params.id },
    { Deleted: true },
    { new: true }
  );
  if (!Class) {
    return res.status(500).json({
      message: "Class not found.",
      success: false,
      data: Class,
    });
  }
  res.status(201).json({
    message: "Class deleted successfully.",
    success: true,
    data: Class,
  });
});
