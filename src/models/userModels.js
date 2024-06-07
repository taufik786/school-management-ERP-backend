const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, "Name is mandatory"],
    },
    Email: {
      type: String,
      required: [true, "Email is mandatory"],
      lowercase: true,
      trim:true
    },
    Username: {
      type: String,
      required: [true, "Username is mandatory"],
      lowercase: true,
      trim:true
    },
    PhoneNumber: { type: String, required: [true, "Phone number is mandatory"], },
    Password: { type: String, required: [true, "Password is mandatory"] },
    Role: { type: String, default: "user" },
    Deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// userSchema.pre("save", async function (next) {
//   if (!this.isModified("Password")) {
//     next();
//   }

//   this.Password = await bcrypt.hash(this.Password, 10);
// });

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.Password);
};

module.exports = new mongoose.model("users", userSchema);
