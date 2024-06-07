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

  res.status(statusCode).cookie("token", token, options).json({
    message: message,
    success: true,
    data: user,
    token: token,
  });
};

module.exports = sendToken;
