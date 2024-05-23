const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is mandatory"],
    },
    email: {
      type: String,
      required: [true, "Email is mandatory"],
      lowercase: true,
    },
    phone: { type: String, default: "" },
    password: { type: String, required: [true, "Password is mandatory"] },
    role: { type: String, default: "user" },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = new mongoose.model("users", userSchema);
