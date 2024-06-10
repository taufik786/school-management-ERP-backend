const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema(
  {
    ClassName: {
      type: String,
      required: [true, "Class is mandatory"],
      lowercase: true,
      trim: true,
    },
    Fee: {
      type: Number,
      default: 0,
    },
    Remarks: { type: String, default: "" },
    Deleted: { type: Boolean, default: false },
    CreatedBy: { type: mongoose.Schema.Types.Mixed, default: "Admin" },
    UpdatedBy: { type: mongoose.Schema.Types.Mixed, default: "Admin" },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("class", ClassSchema);
