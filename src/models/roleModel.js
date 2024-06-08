const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, "Role is mandatory"],
      lowercase: true,
      trim: true,
    },
    Remarks: { type: String, default: "" },
    Deleted: { type: Boolean, default: false },
    CreatedBy: { type: mongoose.Schema.Types.Mixed, default: "Admin" },
    UpdatedBy: { type: mongoose.Schema.Types.Mixed, default: "Admin" },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("role", roleSchema);
