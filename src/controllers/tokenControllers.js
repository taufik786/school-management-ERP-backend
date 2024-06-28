const jwt = require("jsonwebtoken");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModels");

exports.refreshToken = catchAsyncErrors(async (req, res, next) => {
  console.log(req.cookies, "req.cookies111")
  console.log(req.headers.authorization, "req.headers.authorization")
  console.log(req.body, "req.body")
  const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken || req.headers.authorization?.split(" ")[1];
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
    // maxAge: 1 * 60 * 1000,
    maxAge: 10 * 1000,
  });

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  }); // 7 days

  res.status(200).json({
    message: "Access token refreshed",
    success: true,
    data: null,
    accessToken: accessToken,
    refreshToken: newRefreshToken,
  });
});
