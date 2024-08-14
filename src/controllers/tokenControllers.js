require("dotenv").config();
const jwt = require("jsonwebtoken");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModels");

exports.refreshToken = catchAsyncErrors(async (req, res, next) => {
  const refreshToken =
    req.cookies?.refreshToken ||
    req.body?.refreshToken ||
    req.headers.authorization?.split(" ")[1];
  if (!refreshToken) {
    return next(
      new ErrorHandler(
        "You are not authenticated user, Please login first.",
        401
      )
    );
  }

  const decodedToken = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const user = await User.findById(decodedToken?.id);

  if (!user) {
    return next(new ErrorHandler("Invalid refresh token", 401));
  }

  const userWithoutPassword = { ...user.toObject() }; // Shallow copy of the user object
  delete userWithoutPassword.Password;

  const accessToken = jwt.sign(
    { id: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
  );

  const newRefreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRE }
  );

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    maxAge: 15 * 60 * 1000, // 15min,
  });

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  }); // 7 days

  let tokenTimer = process.env.ACCESS_TOKEN_EXPIRE;
  // Convert into miliseconds
  // if (tokenTimer.endsWith("s")) {
  if (tokenTimer.endsWith("m")) {
    let time = tokenTimer.split("m")[0];
    tokenTimer = time * 60 * 1000;
  }

  res.status(200).json({
    message: "Access token refreshed",
    success: true,
    data: userWithoutPassword,
    accessToken: accessToken,
    refreshToken: refreshToken,
    tokenExpiresIn: tokenTimer,
  });
});
