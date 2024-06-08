const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema(
  {
    SchoolName: {
      type: String,
      required: [true, "School name is mandatory"],
      lowercase: true,
      trim: true,
    },
    Email: {
      type: String,
      required: [true, "School email is mandatory"],
      lowercase: true,
      trim: true,
    },
    PhoneNumber: {
      type: String,
      required: [true, "School phone is mandatory"],
    },
    Address: { type: String, required: [true, "Address phone is mandatory"] },
    DirectorName: {
      type: String,
      required: [true, "Director name phone is mandatory"],
    },
    SchoolType: {
      type: String,
      required: [true, "School type name phone is mandatory"],
      lowercase: true,
    },
    Remarks: { type: String, default: "" },
    Established: { type: Date, default: Date.now },
    Deleted: { type: Boolean, default: false },
    CreatedBy: { type: mongoose.Schema.Types.Mixed, default: "" },
    UpdatedBy: { type: mongoose.Schema.Types.Mixed, default: "" },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("schoolDetails", schoolSchema);
