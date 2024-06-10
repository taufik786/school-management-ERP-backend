const mongoose = require("mongoose");

const staffsSchema = new mongoose.Schema(
  {
    Fullname: {
      type: String,
      trim: true,
      required: [true, "Full Name is mandatory"],
    },
    Email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Email is mandatory"],
    },
    PhoneNumber: {
      type: String,
      trim: true,
      required: [true, "Phone number is mandatory"],
    },
    Gender: { type: String, required: [true, "Gender is mandatory"] },
    Date_of_birth: { type: Date, required: [true, "DOB is mandatory"] },
    Religion: { type: String, required: [true, "Religion is mandatory"] },
    Category: { type: String, required: [true, "Category is mandatory"] },
    Qualification: { type: String, required: [true, "Qualification is mandatory"] },
    BasicSalary: { type: Number, required: [true, "Basic salary is mandatory"] },
    BloodGroup: { type: String, default: "" },
    CurrentAddress: {
      type: String,
      required: [true, "Current address is mandatory"],
    },
    PermanentAddress: {
      type: String,
      required: [true, "Permanent address is mandatory"],
    },
    JoiningDate: {
      type: Date,
      default: Date.now(),
    },
    IdNumber: { type: String, default: "" },
    Photo: { type: String, default: null },

    FatherName: { type: String, required: [true, "Father name is mandatory"] },
    FatherPhoneNumber: {
      type: String,
      required: [true, "Father phone number is mandatory"],
    },
    FatherOccupation: { type: String, default: "" },
    MotherName: { type: String, required: [true, "Mother name is mandatory"] },
    MotherOccupation: { type: String, default: "" },
    MotherPhoneNumber: { type: String, default: "" },
    Username: { type: String, default: "", lowercase: true, trim: true },
    PreviousSchool: { type: String, default: "" },
    Role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: [true, "Role is mandatory"],
    },
    Remarks: { type: String, default: "" },
    IsActive: { type: Boolean, default: false },
    Deleted: { type: Boolean, default: false },
    CreatedBy: { type: mongoose.Schema.Types.Mixed, default: "" },
    UpdatedBy: { type: mongoose.Schema.Types.Mixed, default: "" },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Staff", staffsSchema);
