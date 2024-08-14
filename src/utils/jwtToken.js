require("dotenv").config();
const jwt = require("jsonwebtoken");

// Create Token and saving in cookie
const sendToken = (user, statusCode, message, res) => {
  const accessToken = jwt.sign(
    { id: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
  );
  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRE }
  );

  const userWithoutPassword = { ...user.toObject() }; // Shallow copy of the user object
  delete userWithoutPassword.Password;

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    maxAge: 15 * 60 * 1000, // 15min
  });
  res.cookie("refreshToken", refreshToken, {
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
  res.status(statusCode).json({
    message: message,
    success: true,
    data: userWithoutPassword,
    accessToken: accessToken,
    refreshToken: refreshToken,
    tokenExpiresIn: tokenTimer,
  });
};

module.exports = sendToken;
