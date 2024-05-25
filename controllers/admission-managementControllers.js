const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.registerStudent = catchAsyncErrors(async (req, res, next) => {
    console.log("hello")
})