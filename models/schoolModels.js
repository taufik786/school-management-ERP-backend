const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema(
  {
    schoolName: {
      type: String,
      required: [true, "School name is mandatory"],
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "School email is mandatory"],
      lowercase: true,
    },
    phone: { type: String, required: [true, "School phone is mandatory"] },
    address: { type: String, required: [true, "Address phone is mandatory"] },
    directorName: {
      type: String,
      required: [true, "Director name phone is mandatory"],
    },
    schoolType: {
      type: String,
      required: [true, "School type name phone is mandatory"],
      lowercase: true,
    },
    remarks: { type: String, default: "" },
    established: { type: Date, default: Date.now },
    deleted: {type: Boolean, default: false}
  },
  { timestamps: true }
);

module.exports = new mongoose.model("schoolDetails", schoolSchema);
