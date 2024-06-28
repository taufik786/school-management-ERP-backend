const ErrorHander = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");

const User = require("../models/userModels");

exports.isAuth = catchAsyncErrors(async (req, res, next) => {
  try {
    // console.log(req.cookies, "cookiii");
    // console.log(req.headers.authorization, "cookiii");
    const token =
      req.cookies.accessToken || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return next(
        new ErrorHander(
          "You are not authenticated user, Please login first.",
          401
        )
      );
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select("-password");
    if (!user) {
      new ErrorHander("Invalid access token", 401);
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error,"eeeeeee")
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token Has been expired please login again",
        success: false,
        data: null,
      });
    }
  }
});
