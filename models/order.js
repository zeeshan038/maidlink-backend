//NPM Pacakages
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
   
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
