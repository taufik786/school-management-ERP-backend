const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const StudentModel = require("../models/studentModel");

exports.registerStudent = catchAsyncErrors(async (req, res, next) => {
  let existStudent = await StudentModel.find({
    Class: req.body.Class,
    $expr: {
      $eq: [{ $year: "$Session" }, new Date().getFullYear()],
    },
  });
  let stdntLength = existStudent.length;
  let section = "";
  let rollNumber = 1;
  let sectionSize = 5;
  switch (true) {
    case stdntLength <= sectionSize - 1:
      rollNumber = stdntLength <= 0 ? 1 : stdntLength + 1;
      section = "A";
      break;
    case stdntLength >= sectionSize && stdntLength < sectionSize * 2:
      rollNumber = stdntLength - (sectionSize * 1 - 1);
      section = "B";
      break;
    case stdntLength >= sectionSize && stdntLength < sectionSize * 3:
      rollNumber = stdntLength - (sectionSize * 2 - 1);
      section = "C";
      break;
    default:
      rollNumber = stdntLength - (sectionSize * 3 - 1);
      section = "D";
      break;
  }
  req.body.RollNumber = rollNumber;
  req.body.Section = section;
  let student = await StudentModel(req.body).save();
  res.status(201).json({
    message: "Student registered successfully.",
    success: true,
    data: student,
  });
});
exports.updateStudent = catchAsyncErrors(async (req, res, next) => {
  let student = await StudentModel.findByIdAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true }
  );
  res.status(200).json({
    message: "Student updated successfully.",
    success: true,
    data: student,
  });
});

exports.studentsList = catchAsyncErrors(async (req, res, next) => {
  let students = await StudentModel.find();
  if (students.length <= 0) {
    return res.status(404).json({
      message: "Students record does not exist.",
      success: false,
      data: null,
    });
  }
  res.status(200).json({
    message: "Students record fetched successfully.",
    success: true,
    data: students,
  });
});
exports.studentDetails = catchAsyncErrors(async (req, res, next) => {
  let students = await StudentModel.findById(req.params.id);
  if (!students) {
    return res.status(404).json({
      message: "Student does not exist.",
      success: false,
      data: null,
    });
  }
  res.status(200).json({
    message: "Student record fetched successfully.",
    success: true,
    data: students,
  });
});
