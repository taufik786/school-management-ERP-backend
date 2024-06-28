require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModels");
const sendToken = require("../utils/jwtToken");
const ErrorHandler = require("../utils/errorHandler");

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { Name, Email, Password } = req.body;

  if (!Email || !Password || !Name) {
    return res.status(500).json({
      message: "Empty field not allowed",
      success: false,
      data: null,
    });
  }
  const existUser = await User.findOne({ Email: Email, Deleted: false });
  if (existUser) {
    return res.status(500).json({
      message: "User Already Exist",
      success: false,
      data: existUser,
    });
  }

  req.body.Username = Email;
  req.body.Password = await bcrypt.hash(Password, 10);
  const user = await User.create(req.body);
  sendToken(user, 201, "User Account Created Successfully.", res);
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { Username, Password } = req.body;
  if (!Username || !Password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ Username });

  if (!user) {
    return next(new ErrorHandler("Invalid username or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(Password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid username or password", 401));
  }

  sendToken(user, 200, "LoggedIn Successfully!", res);
});

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("accessToken", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.cookie("refreshToken", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});
