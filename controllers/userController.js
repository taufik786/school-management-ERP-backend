const bcrypt = require("bcrypt");

const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModels");
const sendToken = require("../utils/jwtToken");
const ErrorHandler = require("../utils/errorHandler");

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    return res.status(500).json({
      message: "Empty field not allowed",
      success: false,
      data: req.body,
    });
  }
  const existUser = await User.findOne({ email: email, deleted: false });
  if (existUser) {
    return res.status(500).json({
      message: "User Already Exist",
      success: false,
      data: existUser,
    });
  }

  req.body.password = await bcrypt.hash(password, 10);
  const user = await User.create(req.body);
  sendToken(user, 201, "User Account Created Successfully.", res);
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

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

  sendToken(user, 200, "LoggedIn Successfully!", res);
});

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});