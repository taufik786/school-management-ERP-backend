const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    FirstName: {
      type: String,
      trim: true,
      required: [true, "First name is mandatory"],
    },
    MiddleName: {
      type: String,
      trim: true,
      default: "",
    },
    LastName: {
      type: String,
      trim: true,
      required: [true, "Last name is mandatory"],
    },
    Email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
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
    Caste: { type: String, default: "" },
    BloodGroup: { type: String, default: "" },
    CurrentAddress: {
      type: String,
      required: [true, "Current address is mandatory"],
    },
    PermanentAddress: {
      type: String,
      required: [true, "Permanent address is mandatory"],
    },
    AdmissionDate: {
      type: Date,
      required: [true, "Admission date is mandatory"],
    },
    Session: {
      type: Date,
      default: Date.now(),
    },
    Class: {
      type: String,
      required: [true, "Class is mandatory"],
    },
    Section: { type: String, default: "" },
    AdmissionNumber: { type: String, default: "" },
    RollNumber: { type: String, default: "" },
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
    Remarks: { type: String, default: "" },
    IsActive: { type: Boolean, default: false },
    Deleted: { type: Boolean, default: false },
    CreatedBy: { type: mongoose.Schema.Types.Mixed, default: "" },
    UpdatedBy: { type: mongoose.Schema.Types.Mixed, default: "" },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("students", studentSchema);
