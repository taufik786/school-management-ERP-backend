// Register a User
// exports.registerUser = catchAsyncErrors(async (req, res, next) => {
exports.registerUser = async (req, res, next) => {
    console.log("hhhh")
    // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //   folder: "avatars",
    //   width: 150,
    //   crop: "scale",
    // });
  
    // const { name, email, password } = req.body;
  
    // const user = await User.create({
    //   name,
    //   email,
    //   password,
    //   avatar: {
    //     public_id: myCloud.public_id,
    //     url: myCloud.secure_url,
    //   },
    // });
  
    // sendToken(user, 201, res);
  };