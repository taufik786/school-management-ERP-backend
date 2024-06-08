const bcrypt = require("bcrypt");

const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const StudentModel = require("../models/studentModel");
const userModels = require("../models/userModels");

// Student Registration
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
    case stdntLength >= sectionSize && stdntLength < sectionSize * 4:
      rollNumber = stdntLength - (sectionSize * 3 - 1);
      section = "D";
      break;
    default:
      rollNumber = stdntLength - (sectionSize * 4 - 1);
      section = "E";
      break;
  }
  let { FirstName, LastName } = req.body;

  req.body.RollNumber = rollNumber;
  req.body.Section = section;
  req.body.Username = await checkUniqueUsername(FirstName + LastName);

  req.body.CreatedBy = { userId: req.user._id, Name: req.user.Name };
  req.body.UpdatedBy = { userId: req.user._id, Name: req.user.Name };

  let student = await StudentModel(req.body).save();

  let userModel = {
    // if student.MiddleName is blank then removing extra space between name
    Name:
      student.MiddleName === ""
        ? `${student.FirstName} ${student.LastName}`
        : `${student.FirstName} ${student.MiddleName} ${student.LastName}`,
    Email: student.Email,
    Username: student.Username,
    PhoneNumber: student.PhoneNumber,
    Password: await bcrypt.hash("123456", 10),
  };
  await userModels(userModel).save();
  res.status(201).json({
    message: "Student registered successfully.",
    success: true,
    data: student,
  });
});

const checkUniqueUsername = async (username) => {
  let newUsername = username;
  while (true) {
    let uName = await StudentModel.findOne({ Username: newUsername });
    if (!uName) {
      return newUsername;
    }
    const randomNumber = Math.round(Math.random() * 10000);
    newUsername = username + randomNumber;
  }
};

// Update student record
exports.updateStudent = catchAsyncErrors(async (req, res, next) => {
  req.body.UpdatedBy = { userId: req.user._id, Name: req.user.Name };
  let student = await StudentModel.findByIdAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true }
  );
  if (!student) {
    return res.status(500).json({
      message: "Student doest not exist.",
      success: false,
      data: null,
    });
  }
  let userModel = {
    // if student.MiddleName is blank then removing extra space between name
    Name:
      student.MiddleName === ""
        ? `${student.FirstName} ${student.LastName}`
        : `${student.FirstName} ${student.MiddleName} ${student.LastName}`,
    Email: student.Email,
    PhoneNumber: student.PhoneNumber,
  };
  await userModels.findOneAndUpdate(
    { Username: student.Username, Deleted: false },
    userModel,
    { new: true }
  );

  res.status(200).json({
    message: "Student updated successfully.",
    success: true,
    data: student,
  });
});

// Student lists
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

// Student details
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
