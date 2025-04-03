const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner",
      required: true,
    },
    location: {
      type: String,
      default: "",
      required: true,
    },
    duration: {
      type: String,
      default: "",
      required: true,
    },
    jobType: {
      type: String,
      default: "",
      required: true,
    },
    charges: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "canceled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
