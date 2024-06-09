// Create Token and saving in cookie

const sendToken = (user, statusCode, message, res) => {
  const token = user.getJWTToken();

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  const userWithoutPassword = { ...user.toObject() }; // Shallow copy of the user object
  delete userWithoutPassword.Password; // Remove the Password field from the copied object

  res.status(statusCode).cookie("token", token, options).json({
    message: message,
    success: true,
    data: userWithoutPassword,
    token: token,
  });
};

module.exports = sendToken;
